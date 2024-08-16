# Weather App Microservices

## Project Overview

The Weather App Microservices project is designed to deploy a weather application using a microservices architecture on AWS ECS with Docker. The project includes several services: the Weather Data Service for fetching weather data from the National Weather Service (NWS) API, a Basic Alert Service for sending notifications via Amazon SNS, and a frontend interface hosted on S3 and distributed via CloudFront. The services interact with AWS components like API Gateway, ECS, S3, SNS, and CloudWatch to deliver real-time weather data, alerts, and a user-friendly interface.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Try it Out](#try-it-out)
3. [Architecture](#architecture)
4. [Installation](#installation)
   - [Prerequisites](#prerequisites)
   - [Environment Setup](#environment-setup)
   - [Service Deployment](#service-deployment)
5. [Usage](#usage)
6. [Configuration](#configuration)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact Information](#contact-information)
10. [Architecture Diagrams](#architecture-diagrams)
11. [Testing/Test Automation](#testingtest-automation)
12. [CI/CD Pipelines](#cicd-pipelines)
13. [Monitoring and Alerts](#monitoring-and-alerts)
14. [Disaster Recovery and Backup](#disaster-recovery-and-backup)
15. [Scaling and Performance](#scaling-and-performance)

## Try it Out

You can try out the live version of the web app using the following CloudFront link:

**[Weather App on CloudFront](https://d1k9u4x5ouay71.cloudfront.net/)**

## Architecture

### Microservices

- **Weather Data Service**: Fetches weather data from the National Weather Service (NWS) API and provides it via a RESTful API.
- **Basic Alert Service**: Monitors weather data and sends notifications via Amazon SNS based on predefined conditions.
- **API Gateway**: Manages and routes requests to the appropriate microservice, handling integration with ECS services.

### AWS Services

- **ECS**: Manages Docker containers with Fargate for serverless container management.
- **S3**: Hosts static assets for the frontend.
- **SNS**: Sends notifications via email or SMS.
- **CloudWatch**: Monitors and logs ECS tasks.

### External Integration

- **National Weather Service API**: Used for fetching weather data.

## Installation

### Prerequisites

- AWS Account with appropriate permissions.
- AWS CLI installed and configured.
- Docker installed on your local machine.
- Python 3.x for backend development.
- Node.js for frontend development.

### Environment Setup

1. **AWS Setup**:

   - Create IAM users and groups with necessary permissions.
   - Set up VPC, subnets, and security groups.

2. **ECS Setup**:

   - Create an ECS cluster using Fargate.
   - Define and deploy the task definitions for Weather Data Service and Alert Service.

3. **ECR Setup**:

   - Create ECR repositories for each microservice.

4. **Frontend Setup**:
   - Create a React application and configure it to interact with the backend API.
   - Host the frontend on S3 and distribute it via CloudFront for global availability.

### Service Deployment

1. **Deploy Weather Data Service**:

   - Build and push Docker images to ECR.
   - Deploy the service using ECS and configure networking.

2. **Deploy Basic Alert Service**:

   - Build and push Docker images and deploy the service.

3. **Frontend Deployment**:

   - Build the frontend and host it on S3.
   - Configure CloudFront to distribute the content globally, ensuring low latency and high availability.

4. **CI/CD Pipeline**:
   - Set up AWS CodePipeline to automate builds and deployments.
   - Integrate with CodeBuild for building Docker images and deploying them to ECR.

## Usage

- **Accessing the Frontend**:

  - The frontend is hosted on S3 and accessible via a public URL distributed by CloudFront.

- **Interacting with the API**:

  - Use the API Gateway to route requests to the appropriate microservice.
  - Example: `http://<api-gateway-url>/api/weather?lat=38.8894&lon=-77.0352`

- **Monitoring and Alerts**:
  - Use CloudWatch for logs and monitoring, and SNS for sending alerts based on conditions.

## Configuration

- **API Gateway Configuration**: Configure the API Gateway to route requests to the correct microservice.
- **Environment Variables**: Manage configurations for different environments (development, staging, production) using environment variables.
- **Docker Configuration**: Configure Docker containers, including exposed ports, environment variables, and volumes.

## Contributing

Contributions are welcome! Please follow these guidelines:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact Information

For questions, comments, or support, contact [gudivadarahul@gmail.com].

## Architecture Diagrams

_Coming soon_

## Testing/Test Automation

_To be written_

## CI/CD Pipelines

### Currently Working On...

To streamline your development process and ensure that changes to your frontend and backend are automatically tested and deployed without manual intervention, you can set up a CI/CD pipeline using AWS CodePipeline, CodeBuild, and other AWS services. Here’s how you can achieve this:

### Step 1: Set Up a CI/CD Pipeline

#### Use AWS CodePipeline

AWS CodePipeline automates the build, test, and deployment phases of your release process:

- **Pipeline Setup**: Create a new pipeline that triggers whenever there are changes to your GitHub repository (frontend or backend).

#### Configure AWS CodeBuild

Use AWS CodeBuild to automatically build your frontend and backend, ensuring that your code is tested and validated before deployment.

- **For the Frontend**:
  - Install dependencies.
  - Run tests (e.g., using a testing framework like Jest for React).
  - Build the static assets (e.g., using `npm run build`).
  - Upload the built assets to S3.
- **For the Backend**:
  - Build the Docker image.
  - Run tests (e.g., unit tests, integration tests).
  - Push the Docker image to AWS Elastic Container Registry (ECR).

#### Deploy Automatically

- **For the Frontend**:

  - After a successful build, deploy static files to AWS S3.
  - Invalidate the CloudFront cache to ensure the latest files are served to users.

- **For the Backend**:

  - After pushing the Docker image to ECR, configure AWS ECS to automatically update the running service with the new image.

- **For the API Gateway**:
  - Use AWS CloudFormation or Terraform to automatically apply any changes to API Gateway configurations.

### Step 2: Automate the Process

#### Automate S3 Deployment

- Use AWS CodePipeline to automate the deployment of frontend assets to S3 after a successful build, eliminating the need for manual uploads.

#### Automate ECS Deployment

- Configure the ECS service to automatically pull the latest Docker image from ECR once updated.

#### Automate API Gateway Updates

- Use Infrastructure as Code (IaC) tools like AWS CloudFormation or Terraform to manage API Gateway configurations. Ensure that API Gateway updates are included in your CI/CD pipeline so changes are applied automatically.

### Step 3: Test the Changes

#### Run Automated Tests

- Run automated tests for both frontend and backend before deployment. This ensures that errors are caught early and prevents breaking changes from being deployed.

#### Set Up Staging Environments

- Deploy your changes to a staging environment before going live. This allows you to test the entire flow (frontend, backend, API Gateway) in an environment similar to production.

### Step 4: Monitor and Rollback

#### Monitor Deployments

- Use AWS CloudWatch to monitor deployments and ensure everything is working as expected. Set up alerts for any errors or issues during the deployment process.

#### Rollback Strategy

- In case of deployment failures, configure the pipeline to automatically rollback to the previous stable version.

### Example Workflow

1. **Commit Changes**: Changes are committed to GitHub (frontend or backend).
2. **Trigger Pipeline**: AWS CodePipeline triggers the build process:
   - CodeBuild runs tests and builds the project.
   - Docker image is built and pushed to ECR for the backend.
   - Frontend assets are built and uploaded to S3.
3. **Deploy**:
   - If the build and tests are successful:
     - ECS service is updated with the new Docker image.
     - S3 and CloudFront are updated with the new frontend assets.
     - API Gateway updates (if any) are applied automatically.
4. **Monitor and Rollback**:
   - Monitor deployment through CloudWatch.
   - Roll back if any issues are detected.

By implementing this setup, you'll achieve a fully automated CI/CD pipeline that ensures your applications are always up to date with the latest changes, without the need for manual intervention. This setup also provides robust testing and monitoring, helping you catch and address issues early in the development process.

## Monitoring and Alerts

_To be written_

## Disaster Recovery and Backup

_To be written_

## Scaling and Performance

_To be written_
