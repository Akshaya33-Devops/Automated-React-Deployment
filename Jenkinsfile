stage('Deploy to EC2') {
    steps {
        sshagent(['ec2-ssh-key']) {
            bat '''
                ssh -o StrictHostKeyChecking=no ec2-user@65.0.32.37 "docker pull akshayamanimuthu/react-app:dev && docker stop react-container || true && docker rm react-container || true && docker run -d -p 80:80 --name react-container --restart unless-stopped akshayamanimuthu/react-app:dev"
            '''
        }
    }
}
