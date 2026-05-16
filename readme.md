# Fortune Cookie App — AWS Deployment & Docker Setup

## Overview

This project is a simple interactive Fortune Cookie application built to learn end-to-end deployment and infrastructure concepts.

The application consists of:

* React frontend
* FastAPI backend
* nginx reverse proxy
* Dockerized services
* AWS EC2 deployment

---

# Tech Stack

## Frontend

* React
* Vite
* CSS Animations

## Backend

* FastAPI
* Uvicorn

## Infrastructure

* AWS EC2 (Amazon Linux)
* nginx
* Docker
* Docker Compose

---

# Architecture

```
Browser
   ↓
nginx (Frontend Container)
   ├── React Static Files
   └── Reverse Proxy → FastAPI Backend
```

---

# Local Development Setup

## Clone Repository

```bash
git clone <your-repo-url>

cd fortune-cookie
```

---

# Backend Setup

## Create Virtual Environment

```bash
cd backend

python3 -m venv venv

source venv/bin/activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Run FastAPI

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# CORS Configuration

FastAPI uses CORS middleware during local development:

```python
allow_origins=["http://localhost:5173"]
```

This allows the React frontend to communicate with the backend from a different origin during development.

---

# Docker Setup

## Backend Dockerfile

The backend container:

* uses Python 3.12
* installs dependencies
* runs FastAPI using Uvicorn

---

## Frontend Dockerfile

The frontend container:

* builds the React app using Node.js
* serves static files using nginx

---

# Docker Compose

The application is orchestrated using Docker Compose.

Services:

* frontend
* backend

nginx inside the frontend container reverse proxies API calls to the backend container using Docker networking.

---

# Run Using Docker

From project root:

```bash
docker compose up --build
```

Application becomes available at:

```
http://localhost
```

---

# nginx Reverse Proxy Setup

nginx serves:

* React static frontend
* API proxy requests

Example configuration:

```nginx config
/etc/nginx/nginx.conf
```

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8000;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Docker Compose service discovery allows containers to communicate using service names.

---

# AWS EC2 Deployment

## EC2 Setup

Instance Type:

* t3.micro

OS:

* Amazon Linux

---

# Security Group Configuration

Inbound Rules:

* Port 22 → SSH
* Port 80 → HTTP
* Port 8000 → temporary backend testing (optional)

---

# Install Docker on EC2

```bash
sudo dnf update -y

sudo dnf install docker -y

sudo systemctl enable docker

sudo systemctl start docker
```

Install Docker Compose plugin:

```bash
sudo dnf install docker-compose-plugin -y
```

---

# Deploy Application

```bash
git clone <repo-url>

cd fortune-cookie

docker compose up -d --build
```

---

# Public Access

Application is accessible using:

```
http://<EC2_PUBLIC_IP>
```

Optional:

* DuckDNS free domain setup
* SSL via Certbot

---

# AWS Concepts Learned

This project helped explore:

* EC2
* EBS volumes
* Security Groups
* Reverse Proxying
* Public vs Private Networking
* Docker Networking
* Containerized Deployments

---

# Future Improvements

Potential future enhancements:

* HTTPS with Certbot
* GitHub Actions CI/CD
* AWS Application Load Balancer
* AWS WAF
* Kubernetes Deployment
* ECS/Fargate Migration
* Redis Caching
* PostgreSQL/RDS Integration

---

# Learning Notes

Key concepts explored during this project:

* CORS
* nginx reverse proxy
* Docker networking
* Container orchestration
* AWS infrastructure basics
* Linux server administration
* Frontend + backend deployment workflows


# NGINX stale build fix
```
sudo rm -rf /usr/share/nginx/html/*
sudo cp -r dist/* /usr/share/nginx/html/
```
