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

_To be written_

## Monitoring and Alerts

_To be written_

## Disaster Recovery and Backup

_To be written_

## Scaling and Performance

_To be written_
