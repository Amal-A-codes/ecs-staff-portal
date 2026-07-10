# ECS Staff Portal
Production-grade internal employee portal, containerised with Docker and deployed on AWS ECS Fargate.

## 🎯 Overview
An internal hub so employees can search a staff directory instead of a stale spreadsheet, and stay on top of company updates — while also demonstrating a genuinely production-grade AWS deployment: custom VPC, load-balanced ECS Fargate, HTTPS via ACM, and full CI/CD automation.

## 🖥️ App Demo

![App Demo](images/portal-demo.gif)

## 🏗️ Architecture
![Architecture Diagram](images/architecture-diagram.png?v=2)

User → HTTPS (ACM) → Application Load Balancer → ECS Fargate (private subnets, 2 AZs) → pulls image from ECR. Outbound traffic routes via dual NAT Gateways (one per AZ). ECS only accepts traffic from the ALB's security group, containers run as non-root, and images are immutable and vulnerability-scanned.


## 🚀 Quick Start
**Local dev:**
```bash
cd app
npm install
npm run dev
```
Visit http://localhost:5173

**Docker:**
```bash
cd app
docker-compose up -d --build
```
Visit http://localhost:8080

**Infrastructure:**
```bash
cd terraform
terraform init && terraform plan && terraform apply
```
> Requires an S3 backend bucket and AWS credentials configured locally.

## 🛠️ Tech Stack
- **Frontend:** React, Vite, TailwindCSS
- **Containers:** Docker (multi-stage), nginx (non-root)
- **Infrastructure:** Terraform — VPC, ALB, ECS Fargate, ECR, ACM, S3 remote state with locking
- **CI/CD:** GitHub Actions — app build/push, Terraform deploy, Terraform destroy

## 📁 Project Structure
```
ecs-staff-portal/
├── app/            # React frontend + Dockerfile + nginx.conf
├── terraform/
│   └── modules/    # networking, security, alb, acm, ecr, ecs
├── .github/workflows/
├── images/
└── docs/
```

## 🔭 Future Improvements
- ECS auto-scaling (currently fixed at `desired_count = 1`)
- Blue/green deployments via CodeDeploy
- AWS WAF in front of the ALB
- OIDC instead of long-lived AWS keys for CI/CD
- CloudWatch alarms on existing logging

## 📚 Documentation
- [Docker Multi-Stage Build Guide](docs/docker.md)
- [Troubleshooting: Non-Root nginx on ECS Fargate](docs/troubleshooting.md)

## 👤 Author
**Amal Atmani**

> *NovaByte is a mock/fictional company used for the purposes of this portfolio project.*