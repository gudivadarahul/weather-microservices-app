pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-2'
        ECR_REPO = '221082212354.dkr.ecr.us-east-2.amazonaws.com/weather-backend:latest' 
        DOCKER_IMAGE = "${ECR_REPO}:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/gudivadarahul/weather-microservices-app' 
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    // Install dependencies
                    sh 'npm install'
                    // Lint the code
                    sh 'npm run lint'
                    // Build the frontend assets
                    sh 'npm run build'
                    // Archive the build artifacts (optional)
                    archiveArtifacts artifacts: 'dist/**', fingerprint: true
                }
            }
        }

        stage('Backend Build') {
            steps {
                dir('backend') {
                    script {
                        // Build the Docker image
                        sh "docker build -t ${DOCKER_IMAGE} ."
                        
                        // Login to AWS ECR
                        sh """
                        aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO}
                        """
                        
                        // Push the Docker image to ECR
                        sh "docker push ${DOCKER_IMAGE}"
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs() // Clean the workspace after the build
        }
    }
}
