pipeline {
    agent any

    environment {
        DOCKER_IMAGE    = 'react-app'
        EC2_HOST        = 'ec2-user@13.201.83.88'
        CONTAINER_NAME  = 'react-container'
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
                    bat 'set "CI=" && set "DISABLE_ESLINT_PLUGIN=true" && npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('react-source/project') {
                    bat "docker build -t %DOCKER_IMAGE%:jenkins ."
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
                    bat "docker tag %DOCKER_IMAGE%:jenkins %DOCKER_USERNAME%/%DOCKER_IMAGE%:dev"
                    bat "docker push %DOCKER_USERNAME%/%DOCKER_IMAGE%:dev"
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    withCredentials([
                        usernamePassword(
                            credentialsId: 'dockerhub-credentials',
                            usernameVariable: 'DOCKER_USERNAME',
                            passwordVariable: 'DOCKER_PASSWORD'
                        )
                    ]) {
                        bat """
                            ssh -o StrictHostKeyChecking=no %EC2_HOST% "docker pull %DOCKER_USERNAME%/%DOCKER_IMAGE%:dev && docker stop %CONTAINER_NAME% || true && docker rm %CONTAINER_NAME% || true && docker run -d -p 80:80 --name %CONTAINER_NAME% --restart unless-stopped %DOCKER_USERNAME%/%DOCKER_IMAGE%:dev"
                        """
                    }
                }
            }
        }
    }
}
