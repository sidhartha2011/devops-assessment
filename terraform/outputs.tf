output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}

output "container_registry_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "container_app_environment" {
  value = azurerm_container_app_environment.env.name
}

output "postgres_server_name" {
  value = azurerm_postgresql_flexible_server.postgres.name
}

output "key_vault_name" {
  value = azurerm_key_vault.kv.name
}