# Automated Deployment System for React Application

An end-to-end CI/CD pipeline that automatically builds, containerizes, and deploys a React application to AWS EC2 using Docker, Docker Hub, and Jenkins.

## 📋 Overview

This project implements an automated deployment workflow for a React web application.

When the Jenkins pipeline is triggered for the `dev` branch, it:

1. Checks out the source code from GitHub.
2. Builds a Docker image.
3. Pushes the image to Docker Hub.
4. Deploys the image to an AWS EC2 instance.
5. Runs the React application inside an Nginx container.

## 🏗️ Architecture

```text
Developer
    │
    ▼
GitHub Repository
    │
    │ dev branch
    ▼
Jenkins Pipeline
    │
    ├── Checkout Code
    ├── Build Docker Image
    ├── Push Image
    ▼
Docker Hub
    │
    │ Pull Docker Image
    ▼
AWS EC2
    │
    │ Run Docker Container
    ▼
Nginx Web Server
    │
    ▼
Live React Application
```

### Flow Summary

```text
GitHub → Jenkins → Docker Build → Docker Hub → AWS EC2 → React Application
```

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | React |
| Web Server | Nginx |
| Containerization | Docker |
| Image Registry | Docker Hub |
| CI/CD | Jenkins |
| Cloud Hosting | AWS EC2 |
| Operating System | Amazon Linux 2023 |
| Version Control | Git and GitHub |
| Remote Access | SSH |

## 📁 Project Structure

```text
Automated-React-Deployment/
├── build/
│   ├── index.html
│   ├── static/
│   └── assets/
├── Dockerfile
├── Jenkinsfile
├── README.md
├── react_app_cicd_architecture.png
└── docs/
    └── screenshots/
        ├── github-repository.png
        ├── docker-build.png
        ├── dockerhub-image.png
        ├── jenkins-pipeline.png
        ├── aws-ec2.png
        ├── deployed-container.png
        └── live-application.png
```

## 🐳 Dockerfile

```dockerfile
FROM nginx:alpine

COPY build /usr/share/nginx/html

EXPOSE 80
```

### Dockerfile Explanation

- `FROM nginx:alpine` uses the lightweight Nginx Alpine image.
- `COPY build /usr/share/nginx/html` copies the React build files into the Nginx web directory.
- `EXPOSE 80` documents that the application uses port 80 inside the container.

## ⚙️ Jenkins Pipeline

The Jenkins pipeline contains the following stages:

1. **Checkout Code** – Gets the code from the GitHub `dev` branch.
2. **Build Docker Image** – Builds the Docker image.
3. **Push to Docker Hub** – Pushes the image to Docker Hub using Jenkins credentials.
4. **Deploy to EC2** – Connects to EC2, pulls the latest Docker image, and runs the container.

### Jenkins Pipeline Flow

```text
Checkout Code
      ↓
Build Docker Image
      ↓
Push Image to Docker Hub
      ↓
Connect to AWS EC2
      ↓
Pull Latest Image
      ↓
Stop Old Container
      ↓
Run New Container
```

## 🚀 Local Setup and Usage

### Prerequisites

- Git
- Docker Desktop
- A Docker Hub account
- A working React build folder

### Clone the Repository

```bash
git clone https://github.com/Akshaya33-Devops/Automated-React-Deployment.git
cd Automated-React-Deployment
```

### Build the Docker Image

```bash
docker build -t react-app .
```

### Run the Container

```bash
docker run -d -p 8080:80 --name react-container react-app
```

Open the following URL in your browser:

```text
http://localhost:8080
```

### Useful Docker Commands

```bash
docker ps
docker images
docker stop react-container
docker start react-container
docker logs --tail 50 react-container
docker rm react-container
docker update --restart unless-stopped react-container
```

## ☁️ AWS EC2 Deployment

### 1. Launch an EC2 Instance

Create an EC2 instance using:

- Operating System: Amazon Linux 2023
- Instance Type: `t2.micro` or `t3.micro`
- SSH Port: `22`
- HTTP Port: `80`

### 2. Install Docker on EC2

Connect to the EC2 instance and run:

```bash
sudo dnf update -y
sudo dnf install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user
```

Log out and log in again after adding the user to the Docker group.

### 3. Pull the Docker Image

```bash
docker pull akshayamanimuthu/react-app:dev
```

### 4. Stop and Remove the Previous Container

```bash
docker stop react-container || true
docker rm react-container || true
```

### 5. Run the React Application

```bash
docker run -d \
  -p 80:80 \
  --name react-container \
  --restart unless-stopped \
  akshayamanimuthu/react-app:dev
```

### 6. Access the Application

Open the application at your EC2 public IP:

```text
http://65.0.32.37
```

## 🔐 CI/CD Setup Notes

### Docker Hub

The Docker image is pushed to the following Docker Hub repository:

```text
akshayamanimuthu/react-app
```

The image uses the following tag:

```text
dev
```

Full image name:

```text
akshayamanimuthu/react-app:dev
```

Docker Hub credentials should be stored securely in Jenkins. Do not commit passwords or access tokens to GitHub.

### Jenkins Credentials

The Jenkins pipeline uses credentials such as:

```text
dockerhub-credentials
ec2-ssh-key
```

These credentials must be configured inside Jenkins.

### EC2 SSH Access

Jenkins requires SSH access to the EC2 instance. The SSH private key must be stored securely in Jenkins credentials.

Never commit the following files to GitHub:

- Private SSH keys
- AWS access keys
- Docker Hub passwords
- Docker Hub access tokens
- `.pem` files
- Secret configuration files

## 🔗 Project Links

- **GitHub Repository:** [Automated React Deployment](https://github.com/Akshaya33-Devops/Automated-React-Deployment/tree/dev)
- **Docker Hub:** [akshayamanimuthu](https://hub.docker.com/u/akshayamanimuthu)
- **Docker Image:** `akshayamanimuthu/react-app:dev`
- **Live Application:** [http://65.0.32.37](http://65.0.32.37)
- **Architecture Diagram:** [View Architecture Diagram](https://github.com/Akshaya33-Devops/Automated-React-Deployment/blob/dev/react_app_cicd_architecture.png)

## 🖼️ Architecture Diagram

The architecture diagram is saved at the repository root as:

```text
react_app_cicd_architecture.png
```

The diagram shows this flow:

```text
GitHub → Jenkins → Docker → Docker Hub → AWS EC2 → React Application
```

View it directly here: [react_app_cicd_architecture.png](https://github.com/Akshaya33-Devops/Automated-React-Deployment/blob/dev/react_app_cicd_architecture.png)

## 📸 Project Screenshots

Screenshots are stored in:

```text
docs/screenshots/
```

| File | Description |
|---|---|
| `github-repository.png` | GitHub repository showing the `dev` branch |
| `docker-build.png` | Docker image built successfully (`docker images`) |
| `dockerhub-image.png` | Docker Hub repository showing the `dev` tag |
| `jenkins-pipeline.png` | Successful Jenkins pipeline run |
| `aws-ec2.png` | EC2 instance details / terminal |
| `deployed-container.png` | Container running on EC2 (`docker ps`) |
| `live-application.png` | React application running via the EC2 public IP |

## ✅ Deployment Verification Checklist

- [x] Docker image built successfully.
- [x] React application tested locally.
- [x] Docker image pushed to Docker Hub.
- [x] Docker Hub image tagged as `dev`.
- [x] Docker installed on EC2.
- [x] React container running on EC2.
- [x] Application accessed through the EC2 public IP.
- [x] Jenkins pipeline completed successfully.

## 🚀 Future Improvements

- Add automated testing.
- Add SonarQube code-quality analysis.
- Add HTTPS using a domain name and SSL certificate.
- Add health checks.
- Add rollback support.
- Add separate staging and production branches.
- Use environment variables for deployment configuration.
- Add monitoring using Prometheus and Grafana.

## 📄 License

This project is created for educational and portfolio purposes as part of DevOps training.
