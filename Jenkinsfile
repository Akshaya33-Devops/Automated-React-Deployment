pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t react-app:jenkins .'
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
                        ssh -o StrictHostKeyChecking=no ec2-user@65.0.32.37 "docker pull akshayamanimuthu/react-app:dev && docker stop react-container || true && docker rm react-container || true && docker run -d -p 80:80 --name react-container --restart unless-stopped akshayamanimuthu/react-app:dev"
                    '''
                }
            }
        }
    }
}
