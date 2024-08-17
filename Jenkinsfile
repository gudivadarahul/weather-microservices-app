pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-2'
        ECR_REPO = '221082212354.dkr.ecr.us-east-2.amazonaws.com/weather-backend:latest'
        S3_BUCKET = 'weather-info-app-frontend' 
        DISTRIBUTION_ID = 'E2JPFHE3VYJCK4' 
        DOCKER_IMAGE = "${ECR_REPO}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone the repository
                git branch: 'main', url: 'https://github.com/gudivadarahul/weather-microservices-app' 
            }
        }

        stage('Install Node.js and npm (macOS)') {
            when {
                expression { isUnix() }
            }
            steps {
                // Install Node.js and npm using Homebrew on macOS
                sh '''
                if ! type node > /dev/null 2>&1; then
                    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
                    brew install node
                fi
                '''
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

        stage('Frontend Deployment') {
            steps {
                dir('frontend') {
                    script {
                        // Upload the build files to S3
                        sh "aws s3 sync dist/ s3://${S3_BUCKET} --delete"
                        
                        // Invalidate CloudFront to serve the latest frontend
                        sh """
                        aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/*"
                        """
                    }
                }
            }
        }

        stage('Backend Deployment') {
            steps {
                script {
                    // Update ECS service to use the new Docker image
                    sh """
                    aws ecs update-service --cluster your-ecs-cluster-name --service your-ecs-service-name \
                    --force-new-deployment --region ${AWS_REGION}
                    """
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
