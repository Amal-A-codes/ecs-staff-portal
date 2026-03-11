# ECS Staff Portal

Internal employee portal application with Docker containerisation.

## 🎯 Project Overview

A React-based staff portal being prepared for AWS ECS deployment using modern DevOps practices.

**Current Status:**
- ✅ React frontend application
- ✅ Docker multi-stage build
- ✅ docker-compose orchestration
- ✅ Containerised and tested locally
- 🔄 Infrastructure setup in progress

## 🐳 Docker Multi-Stage Build

This project uses **multi-stage Docker builds** to optimise production image size:

| Build Type | Image Size | Reduction |
|-----------|-----------|-----------|
| Single-stage | 314 MB | - |
| **Multi-stage** | **92.6 MB** | **70% smaller** |

**Key optimisation:**
- Stage 1: Build React app with Node.js (includes all build tools)
- Stage 2: Serve with nginx Alpine (only built static files)
- Production image contains zero build dependencies

→ **[See detailed Docker optimisation guide](docs/docker.md)**

## 📁 Project Structure
```
ecs-staff-portal/
├── app/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── .dockerignore
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── docs/
│   └── docker.md
├── images/
├── terraform/
├── .github/
│   └── workflows/
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Local Development
```bash
cd app
npm install
npm run dev
```
Visit http://localhost:5173

### Docker (Production Mode)

**Option 1: Using docker-compose** (Recommended)
```bash
cd app
docker-compose up
```
Visit http://localhost:8080

**Option 2: Using Docker directly**
```bash
cd app
docker build -t staff-portal .
docker run -p 8080:80 staff-portal
```
Visit http://localhost:8080

### Stop Containers
```bash
docker-compose down
```

## 🛠️ Technology Stack

**Current:**
- **Frontend:** React, Vite, TailwindCSS
- **Containerisation:** Docker (multi-stage builds)
- **Web Server:** nginx (Alpine)
- **Orchestration:** docker-compose

**Planned:**
- **Infrastructure:** Terraform (AWS ECS, VPC, ALB)
- **CI/CD:** GitHub Actions

## 📚 Documentation

- [Docker Optimisation Guide](docs/docker.md) - Multi-stage build analysis

## 👤 Author

Amal Atmani