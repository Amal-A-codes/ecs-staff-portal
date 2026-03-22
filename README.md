# ECS Staff Portal

Internal employee portal application with Docker containerisation.

## 🎯 Project Overview

A React-based staff portal being prepared for AWS ECS deployment using modern DevOps practices.

**Current Status:**
- ✅ React frontend application
- ✅ Docker containerisation (multi-stage build, 80% size reduction)
- ✅ Local development environment ready
- 🔄 Infrastructure setup in progress

## 📁 Project Structure
```
ecs-staff-portal/
├── app/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   └── vite.config.js
├── docs/
│   └── docker.md
├── terraform/
├── .github/
│   └── workflows/
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
```bash
cd app
docker-compose up -d --build
```

Visit http://localhost:8080

**Stop containers:**
```bash
docker-compose down
```

## 🛠️ Technology Stack

**Current:**
- **Frontend:** React, Vite, TailwindCSS
- **Containerisation:** Docker, docker-compose
- **Web Server:** nginx Alpine

**Planned:**
- **Infrastructure:** Terraform (AWS ECS, VPC, ALB)
- **CI/CD:** GitHub Actions

## 📚 Documentation

- [Docker Multi-Stage Build Guide](docs/docker.md) - Image optimisation details

## 👤 Author

Amal Atmani