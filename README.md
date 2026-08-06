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
* GitHub Actions

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

The service currently provides endpoints for:

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

An example configuration is provided in `.env.example`.

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
│   └── secret.yaml
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── schema.sql
├── server.js
├── package.json
└── README.md
```

## Assessment Context

This repository contains my solution for the **VexarDrive Technologies DevOps & Cloud Infrastructure Engineer Technical Assessment**.

The required security improvements, Docker support, Kubernetes manifests, and production-readiness enhancements have been implemented. The GitHub Actions deployment workflow could not be completed because the required Azure credentials were not available, as noted in the assessment instructions.
