# Troubleshooting: Deploying nginx as a Non-Root User on ECS Fargate

This doc walks through a real debugging session from deploying this project. The container built successfully and ran fine locally with `docker run`, but crash-looped on ECS Fargate. This is a record of the actual diagnosis process and fixes, kept as-is (including the wrong turns) because that's a more honest and useful account than a cleaned-up summary.

## Context

The Dockerfile runs nginx as a non-root user (`nginxuser`) for security — a `USER` directive is set in both build stages, and ownership of the relevant directories is explicitly `chown`'d during the build:

```dockerfile
RUN touch /var/run/nginx.pid && \
    chown -R nginxuser:nginxuser /var/run/nginx.pid /var/cache/nginx /usr/share/nginx/html
USER nginxuser
```

Locally, this worked without issue:

```bash
docker run -p 8080:80 staff-portal:1.0.0
# → app loads fine at localhost:8080
```

On ECS, the service never reached a steady state — tasks would start, register with the ALB target group, then almost immediately drain and stop.

## Step 1 — Confirm the service is actually failing

```bash
aws ecs describe-services --cluster ecs-staff-portal-cluster \
  --services ecs-staff-portal-service --region eu-west-2 --no-cli-pager
```

Key output:
```
"runningCount": 0,
"desiredCount": 1,
```

Repeating events showed the same pattern: task starts → registers with target group → begins draining → deregisters. ECS kept retrying and kept failing the same way.

## Step 2 — Find the stopped task and its exit reason

```bash
aws ecs list-tasks --cluster ecs-staff-portal-cluster \
  --region eu-west-2 --desired-status STOPPED --no-cli-pager

aws ecs describe-tasks --cluster ecs-staff-portal-cluster \
  --tasks <task-arn> --region eu-west-2 --no-cli-pager \
  | jq '.tasks[0] | {stoppedReason, stopCode, containers: [.containers[] | {name, lastStatus, reason, exitCode}]}'
```

Output:
```json
{
  "stoppedReason": "Essential container in task exited",
  "stopCode": "EssentialContainerExited",
  "containers": [
    { "name": "ecs-staff-portal", "lastStatus": "STOPPED", "reason": null, "exitCode": 1 }
  ]
}
```

`exitCode: 1` confirmed the container itself was crashing, not an infrastructure problem (image pull, IAM, networking were all fine — the task genuinely started, just died immediately). `reason: null` didn't say why, so the next step was the actual container logs.

## Step 3 — Read the CloudWatch logs

```bash
aws logs describe-log-streams --log-group-name /ecs/ecs-staff-portal \
  --region eu-west-2 --no-cli-pager --order-by LastEventTime --descending --max-items 1

aws logs get-log-events --log-group-name /ecs/ecs-staff-portal \
  --log-stream-name "<stream-name>" --region eu-west-2 --no-cli-pager
```

The real error:
```
nginx: [emerg] mkdir() "/var/cache/nginx/client_temp" failed (30: Read-only file system)
```

## Issue 1 — `readonlyRootFilesystem: true` blocks nginx's temp directories

The ECS task definition had `readonlyRootFilesystem: true` set for defense-in-depth. nginx needs to create a few working directories at startup (`client_temp`, `proxy_temp`, etc.) even when otherwise fully configured — a read-only root filesystem blocks that outright, and nginx fails before it can even start listening.

**First attempt:** mount writable `tmpfs` volumes at `/var/cache/nginx` and `/var/run` in the task definition, keeping `readonlyRootFilesystem: true`.

Result: the error changed, but didn't go away —
```
nginx: [emerg] mkdir() "/var/cache/nginx/client_temp" failed (13: Permission denied)
```
The mount was writable, but owned by root, while the container runs as `nginxuser`. Chasing exact UID ownership across ECS-managed ephemeral volumes turned into more complexity than it was worth for this project.

**Actual fix:** drop `readonlyRootFilesystem` for now (noted in [Future Improvements](../README.md#-future-improvements) as something to revisit properly), and — more importantly — relocate nginx's temp paths to `/tmp`, which is writable by default in the base image regardless of user. This is also what the official `nginxinc/docker-nginx-unprivileged` image recommends for non-root setups.

`nginx.conf`:
```nginx
server {
    listen 80;
    ...
    client_body_temp_path /tmp/client_temp;
    proxy_temp_path       /tmp/proxy_temp;
    fastcgi_temp_path     /tmp/fastcgi_temp;
    uwsgi_temp_path       /tmp/uwsgi_temp;
    scgi_temp_path        /tmp/scgi_temp;
}
```

`Dockerfile`:
```dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /tmp/client_temp /tmp/proxy_temp /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp && \
    chown -R nginxuser:nginxuser /tmp/client_temp /tmp/proxy_temp /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp
```

## Issue 2 — binding to port 80 as a non-root user

After the fix above, a *new* error appeared on the next deploy:
```
nginx: [emerg] bind() to 0.0.0.0:80 failed (13: Permission denied)
```

This is a standard Linux restriction, unrelated to Docker or ECS: only root can bind to ports below 1024 ("privileged ports"). `nginxuser` is deliberately non-root, so binding to port 80 inside the container will always fail — this had likely gone unnoticed locally because Docker Desktop's networking layer on macOS can behave differently from a real Linux kernel, which is what Fargate runs on.

**Fix:** have nginx listen on an unprivileged port internally (`8080`), and let the ALB handle the public-facing port 80/443 externally. The container's internal port and the ALB's external port don't need to match.

- `nginx.conf`: `listen 8080;`
- `Dockerfile`: `EXPOSE 8080`, healthcheck updated to `curl -f http://localhost:8080/`
- Terraform: ECS task definition `containerPort` → `8080`; ALB target group `port` → `8080`; ECS security group ingress → `8080` (ALB listener itself stays on 80/443 — only the internal routing target changed)

## Issue 3 — target group replacement conflict

Changing the target group's port (`80` → `8080`) forces Terraform to replace it (port is an immutable attribute). The first `terraform apply` failed:
```
Error: deleting ELBv2 Target Group ...: ResourceInUse: Target group ... is currently in use by a listener or a rule
```
Terraform tried to destroy the old target group before the listener had been repointed to the new one.

**Fix:** add a `lifecycle` block so the new target group is created *before* the old one is destroyed:
```hcl
resource "aws_lb_target_group" "main" {
  ...
  lifecycle {
    create_before_destroy = true
  }
}
```
This also surfaced a secondary conflict — AWS target group names must be unique, so the new one (created before the old is destroyed) needed a temporarily different name until the old one was cleared.

## Result

```bash
aws ecs describe-services --cluster ecs-staff-portal-cluster \
  --services ecs-staff-portal-service --region eu-west-2 --no-cli-pager \
  | jq '.services[0] | {runningCount, desiredCount}'
```
```json
{ "runningCount": 1, "desiredCount": 1 }
```

## Takeaways

- **"Works locally, fails on ECS" is a real category of bug**, not a fluke — usually points to a genuine difference between the local Docker runtime and the actual Linux environment Fargate runs on, rather than the image being broken.
- **CloudWatch Logs were the actual source of truth throughout** — `stoppedReason` and `exitCode` from `describe-tasks` narrowed down *that* something was wrong, but the real error message only ever showed up in the container's own logs.
- **Non-root containers, read-only filesystems, and privileged ports are three separate hardening concerns that can each independently break a container that otherwise looks correctly configured.** Applying all three at once made it harder to isolate which one was actually responsible for a given failure — worth introducing them one at a time in future.
