variable "resource_group_name" {
  default = "vexar-rg"
}

variable "location" {
  default = "East US"
}

variable "container_registry_name" {
  default = "vexaracr"
}

variable "container_app_environment_name" {
  default = "vexar-env"
}

variable "container_app_name" {
  default = "fleet-ping-service"
}

variable "postgres_server_name" {
  default = "vexar-postgres"
}

variable "postgres_database_name" {
  default = "vexar_fleet"
}

variable "key_vault_name" {
  default = "vexar-keyvault"
}

variable "log_analytics_name" {
  default = "vexar-logs"
}