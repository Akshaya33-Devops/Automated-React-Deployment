pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'react-app'
        EC2_HOST = 'ec2-user@NEW_EC2_PUBLIC_IP'
        CONTAINER_NAME = 'react-container'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('react-source/project') {
                    bat 'npm install'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('react-source/project') {
                    bat 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('react-source/project') {
                    bat 'docker build -t react-app:jenkins .'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'
                    bat 'docker tag react-app:jenkins %DOCKER_USERNAME%/react-app:dev'
                    bat 'docker push %DOCKER_USERNAME%/react-app:dev'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    bat '''
                        ssh -o StrictHostKeyChecking=no %EC2_HOST% "docker pull akshayamanimuthu/react-app:dev && docker stop %CONTAINER_NAME% || true && docker rm %CONTAINER_NAME% || true && docker run -d -p 80:80 --name %CONTAINER_NAME% --restart unless-stopped akshayamanimuthu/react-app:dev"
                    '''
                }
            }
        }
    }
}   
