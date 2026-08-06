# Fleet Ping Service

The Fleet Ping Service is a Node.js/Express backend service used to receive vehicle location updates and handle driver authentication.

As part of the **VexarDrive Technologies DevOps & Cloud Infrastructure Engineer Technical Assessment**, the application was enhanced to improve security, production readiness, Docker support, and Kubernetes deployment.

The service is configured to use PostgreSQL for persistent storage and is containerized using Docker.

## Technology Stack

* Node.js
* Express.js
* PostgreSQL
* Docker
* Kubernetes
* Terraform
* GitHub Actions
* Azure (Architecture Design)

## Improvements Implemented

### Security

* Removed hardcoded secrets from the application
* Moved configuration to environment variables
* Added Helmet for secure HTTP headers
* Enabled CORS
* Added API rate limiting
* Implemented JWT authentication middleware
* Replaced SQL string concatenation with parameterized queries to prevent SQL injection

### Database

* Replaced individual PostgreSQL client connections with a shared connection pool (`pg.Pool`)
* Added database readiness checks

### Health Monitoring

* Added `GET /health`
* Added `GET /ready`

### Infrastructure

* Dockerized the application
* Added Kubernetes Deployment
* Added Kubernetes Service
* Added ConfigMap
* Added Secret manifest

## API Endpoints

The service provides the following endpoints:

* Driver login
* Vehicle location ping ingestion
* Fleet ping retrieval
* Health check (`GET /health`)
* Readiness check (`GET /ready`)

Refer to the application source for endpoint definitions, request formats, and current behavior.

## Prerequisites

To run the service locally, ensure you have:

* Node.js
* npm
* PostgreSQL (optional for local testing)

Alternatively, the application can be built and run using Docker.

## Local Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file using the provided `.env.example`.

Start the application:

```bash
npm start
```

The service will start on the configured application port (default: **3000**).

## Database

The application is configured to use PostgreSQL.

The initial database structure is available in:

```text
schema.sql
```

If PostgreSQL is configured locally, apply the schema before running the application.

## Docker

The repository includes:

```text
Dockerfile
docker-compose.yml
```

Build the Docker image:

```bash
docker build -t vexar-fleet-service .
```

Run the container:

```bash
docker run -p 3000:3000 vexar-fleet-service
```

## Kubernetes

The repository includes Kubernetes manifests under the `k8s/` directory:

```text
deployment.yaml
service.yaml
configmap.yaml
secret.yaml
```

## Configuration

Application configuration is managed through environment variables.

The following variables are required:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_database_password
DB_NAME=vexar_fleet

JWT_SECRET=your_jwt_secret
```

For local development, these values can be stored in a `.env` file.

For production deployments, sensitive information such as database credentials and JWT secrets should not be stored in the repository. Instead, they should be managed securely using Azure Key Vault or GitHub Actions Secrets.(Add Terraform infrastructure and update README)

## CI/CD

A GitHub Actions workflow is included in the repository.

Changes pushed to the `main` branch trigger the deployment workflow.

> **Note:** The deployment workflow targets a private Azure Container Registry. Since Azure credentials were not provided as part of the assessment, the deployment workflow could not authenticate to the registry. This is consistent with the assessment instructions, which state that a live Azure deployment is optional.

## Repository Structure

```text
.
├── .github/
│   └── workflows/
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
├── terraform/
│   ├── provider.tf
│   ├── variables.tf
│   ├── main.tf
│   ├── outputs.tf
│   ├── terraform.tfvars.example
│   └── README.md (Add Terraform infrastructure and update README)
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── schema.sql
├── server.js
├── package.json
├── README.md
└── .env.example
```
## Infrastructure as Code

Terraform configuration has been included to demonstrate the Azure infrastructure required to deploy the application.

The Terraform project provisions:

- Azure Resource Group
- Azure Container Registry
- Azure Container Apps Environment
- Azure Database for PostgreSQL Flexible Server
- Azure Key Vault
- Azure Log Analytics Workspace

The infrastructure was designed as part of the assessment and was not deployed because an Azure subscription was not available.

## Assessment Context

This repository contains my solution for the **VexarDrive Technologies DevOps & Cloud Infrastructure Engineer Technical Assessment**.

The Fleet Ping Service has been enhanced to improve production readiness, security, containerization, Kubernetes deployment, Infrastructure as Code, and operational reliability as part of the assessment.

The required security improvements, Docker support, Kubernetes manifests, and Terraform Infrastructure as Code have been implemented.

A live Azure deployment and GitHub Actions deployment to Azure could not be completed because an Azure subscription and the required Azure credentials were not available, as permitted by the assessment instructions.
