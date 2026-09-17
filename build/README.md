# Automated Deployment System for React Application

An end-to-end CI/CD pipeline that automatically builds, containerizes, and deploys a React application to AWS EC2 using Docker, Docker Hub, and Jenkins — with full monitoring and alerting via Prometheus, Grafana, and Node Exporter.

## 📋 Overview

This project implements an automated deployment workflow for a React web application.

When the Jenkins pipeline is triggered for the `dev` branch, it:

1. Checks out the source code from GitHub.
2. Builds a Docker image.
3. Pushes the image to Docker Hub.
4. Deploys the image to an AWS EC2 instance.
5. Runs the React application inside an Nginx container.

The deployed application is continuously monitored using Prometheus and Grafana, with automated email alerts for high CPU usage.

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
| Metrics Collection | Node Exporter |
| Monitoring | Prometheus |
| Visualization / Dashboards | Grafana |
| Alerting | Grafana Alerting + Gmail (SMTP) |

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
        ├── aws-ec2-console.png
        ├── aws-security-group-configuration.png
        ├── deployed-react-application.png
        ├── dockerhub-repository-image-tags.png
        ├── grafana-dashboard.png1
        ├── grafana-dashboard.png2
        ├── grafana-email-notification.png
        ├── grafana-high-cpu-alert.png
        ├── jenkins-configuration-settings.png
        ├── jenkins-login-page.png
        ├── jenkins-pipeline-execution.png
        └── prometheus-target-up.png
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
- Instance Type: `t3.micro`
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
http://13.201.83.88
```

## 📊 Monitoring

The deployed React application is monitored using Prometheus, Node Exporter, and Grafana.

### Monitoring Flow

```text
EC2 Server → Node Exporter → Prometheus → Grafana
```

### Node Exporter

Node Exporter collects system-level metrics from the AWS EC2 instance, including CPU, memory, disk, and network usage.

### Prometheus

Prometheus collects and stores the metrics exposed by Node Exporter.

The Node Exporter target is configured as:

```text
localhost:9100
```

The Prometheus target health was verified as **UP**.

### Grafana

Grafana is connected to Prometheus as the monitoring data source.

The `EC2 Monitoring` dashboard includes panels for:

- Target Status
- CPU Usage
- Memory Usage
- Disk Usage
- Network Received
- Network Transmitted

## 🔔 Alerting and Email Notification

A Grafana alert rule was configured to monitor high CPU usage.

### Alert Configuration

- Alert Name: `High CPU Usage`
- CPU Threshold: `80%`
- Pending Period: `5 minutes`
- Notification Channel: Email

The alert was tested successfully, and a test notification was received via Gmail.

This allows the system administrator to receive an email notification when the configured CPU usage condition is continuously met.

## 🔄 Full Project Architecture (CI/CD + Monitoring)

The project follows an automated CI/CD and monitoring workflow end to end:

```text
Developer
    ↓
GitHub (dev branch)
    ↓
Jenkins
    ↓
React Application Build
    ↓
Docker Image Build
    ↓
Docker Hub (akshayamanimuthu/react-app:dev)
    ↓
AWS EC2
    ↓
Docker Container
    ↓
React Application
    ↓
Node Exporter
    ↓
Prometheus
    ↓
Grafana
    ↓
CPU Alert
    ↓
Gmail Notification
```

## ✅ Monitoring Health Check

The monitoring setup was verified using the following checks:

- Node Exporter service: Running
- Prometheus service: Running
- Prometheus target: UP
- Grafana service: Running
- Grafana dashboard: Available
- High CPU alert: Tested successfully
- Gmail notification: Received successfully

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
- **Live Application:** [http://13.201.83.88](http://13.201.83.88)
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
| `aws-ec2-console.png` | AWS EC2 console showing the running instance |
| `aws-security-group-configuration.png` | EC2 security group inbound rules (SSH, HTTP, etc.) |
| `deployed-react-application.png` | React application running via the EC2 public IP |
| `dockerhub-repository-image-tags.png` | Docker Hub repository showing the `dev` image tag |
| `grafana-dashboard.png1` | Grafana EC2 Monitoring dashboard (view 1) |
| `grafana-dashboard.png2` | Grafana EC2 Monitoring dashboard (view 2) |
| `grafana-email-notification.png` | Email notification received from Grafana alert |
| `grafana-high-cpu-alert.png` | Grafana High CPU Usage alert configuration |
| `jenkins-configuration-settings.png` | Jenkins pipeline/job configuration settings |
| `jenkins-login-page.png` | Jenkins login page |
| `jenkins-pipeline-execution.png` | Successful Jenkins pipeline run |
| `prometheus-target-up.png` | Prometheus target showing Node Exporter as UP |

## ✅ Deployment Verification Checklist

- [x] Docker image built successfully.
- [x] React application tested locally.
- [x] Docker image pushed to Docker Hub.
- [x] Docker Hub image tagged as `dev`.
- [x] Docker installed on EC2.
- [x] React container running on EC2.
- [x] Application accessed through the EC2 public IP.
- [x] Jenkins pipeline completed successfully.
- [x] Node Exporter installed and running on EC2.
- [x] Prometheus configured and target verified as UP.
- [x] Grafana dashboard created and connected to Prometheus.
- [x] High CPU alert configured and tested.
- [x] Email notification received via Gmail.

## 🚀 Future Improvements

- Add automated testing.
- Add SonarQube code-quality analysis.
- Add HTTPS using a domain name and SSL certificate.
- Add health checks.
- Add rollback support.
- Add separate staging and production branches.
- Use environment variables for deployment configuration.
- Expand monitoring with additional Grafana dashboards (disk I/O, container-level metrics).
- Add alerting for memory and disk usage thresholds.
- Integrate Alertmanager for more advanced alert routing (Slack, PagerDuty, etc.).

## 📄 License

This project is created for educational and portfolio purposes as part of DevOps training.
