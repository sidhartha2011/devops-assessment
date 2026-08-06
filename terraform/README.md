# Terraform Infrastructure

This directory contains Infrastructure as Code (IaC) for deploying the Fleet Ping Service to Microsoft Azure.

## Resources

- Azure Resource Group
- Azure Container Registry (ACR)
- Azure Container Apps Environment
- Azure Database for PostgreSQL Flexible Server
- Azure Key Vault
- Azure Log Analytics Workspace

## Notes

This Terraform configuration was created as part of the VexarDrive DevOps & Cloud Infrastructure Engineer Technical Assessment.

The infrastructure was designed but not deployed because an Azure subscription was not available during the assessment.

For a production deployment:

- Secrets should be stored in Azure Key Vault.
- Authentication should use Managed Identity.
- Resource names should be customized.
- Sensitive values should be supplied through secure Terraform variables or CI/CD secrets.