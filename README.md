# ECS Staff Portal

Internal employee portal application with Docker containerisation.

## 🎯 Project Overview

A React-based staff portal being prepared for AWS ECS deployment using modern DevOps practices.

**Current Status:**
- ✅ React frontend application
- ✅ Docker multi-stage build
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
├── app/                    # React staff portal application
│   ├── src/               # Source code
│   ├── public/            # Static assets
│   └── package.json       # Dependencies
├── docs/                  # Documentation
│   └── docker.md         # Docker optimisation guide
├── images/                # Screenshots and diagrams
├── Dockerfile             # Multi-stage container build
├── .dockerignore          # Docker build exclusions
├── .gitignore             # Git exclusions
└── README.md
```

## 🚀 Quick Start

### Local Development
```bash
# Run the React app locally
cd app
npm install
npm run dev
# Visit http://localhost:5173
```

### Docker (Local Testing)
```bash
# Build the Docker image
docker build -t staff-portal .

# Run the container
docker run -p 8080:80 staff-portal
# Visit http://localhost:8080
```

## 🛠️ Technology Stack

**Current:**
- **Frontend:** React, Vite, TailwindCSS
- **Containerisation:** Docker (multi-stage builds)
- **Web Server:** nginx (Alpine)

**Planned:**
- **Infrastructure:** Terraform (AWS ECS, VPC, ALB)
- **CI/CD:** GitHub Actions

## 📚 Documentation

- [Docker Optimisation Guide](docs/docker.md) - Multi-stage build analysis

## 👤 Author

Amal Atmani