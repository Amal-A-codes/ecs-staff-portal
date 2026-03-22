# Docker Multi-Stage Build Optimisation

## Overview
This project uses multi-stage Docker builds with security best practices to create lightweight, production-ready container images.

## Image Size Comparison

![Docker image comparison](../images/docker-comparison.png)

| Build Type | Image Size | Reduction |
|-----------|-----------|-----------|
| Single-stage | 402 MB | - |
| **Multi-stage** | **77.9 MB** | **80% smaller** |

## How It Works

### Single-Stage Build (Not Used)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build
# + nginx setup

# Result: 402 MB
# Contains: Node.js, npm, build tools, source code, dependencies
```

**Problems:**
- ❌ Large image (402 MB)
- ❌ Contains unnecessary build tools
- ❌ Includes all dependencies
- ❌ Larger security attack surface

### Multi-Stage Build (Production)
```dockerfile
# Stage 1: Build
FROM node:18-alpine@sha256:... AS builder
RUN adduser -S reactuser
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-cache-dir
COPY . ./
USER reactuser
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine@sha256:...
RUN adduser -S nginxuser
COPY --from=builder /app/dist /usr/share/nginx/html
USER nginxuser
HEALTHCHECK CMD curl -f http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]

# Result: 77.9 MB
# Contains: nginx + built static files ONLY
```

**Benefits:**
- ✅ 80% smaller (77.9 MB vs 402 MB)
- ✅ No Node.js in production
- ✅ No source code in production
- ✅ Runs as non-root user
- ✅ SHA-pinned base images
- ✅ Automatic health checks
- ✅ Minimal attack surface

## What Gets Excluded

**Automatically excluded from production:**
- ❌ node_modules/ (~200+ MB)
- ❌ Build tools (Vite, etc.)
- ❌ Source code (.jsx files)
- ❌ Node.js runtime
- ❌ npm package manager

**What's included:**
- ✅ nginx web server (~20 MB)
- ✅ Built React app (~55 MB)
- ✅ Static assets (HTML, CSS, JS)

## Real-World Impact

### Deployment Speed
- **Single-stage:** ~2-3 minutes per deployment
- **Multi-stage:** ~30-45 seconds per deployment
- **Improvement:** 4x faster

### Security
- Runs as non-root user (UID 1001)
- SHA-pinned immutable base images
- Minimal attack surface
- Automatic health monitoring

## Build and Run
```bash
# Build and start
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Compare sizes
docker images | grep staff-portal
```

**Output:**
```
REPOSITORY       TAG       SIZE
staff-portal     1.0.0     77.9 MB
```

## Why This Matters

**For AWS ECS deployment:**
- ✅ Faster image pulls from ECR
- ✅ 80% lower storage costs
- ✅ Quicker container starts
- ✅ Reduced bandwidth usage
- ✅ Better security posture

**Industry best practice:** Multi-stage builds with non-root users are the standard for production containerized applications.

---

**Back to:** [Main README](../README.md)