locals {
  name      = "huerray-web"
  tier      = "live"
  hostnames = ["huerray.de", "huerray.de", "www.huerray.de", "www.huerray.de"]
}

module "huerray_web" {
  source = "git::ssh://git@github.com/Thrypes/terraform-modules.git//ecs-service?depth=1"

  name            = local.name
  environment     = "thrypes"
  tier            = local.tier
  network_tier    = "dev"
  hostnames       = local.hostnames
  service_version = var.service_version
  env_vars        = var.env_vars
  secrets         = var.secrets
  ecr_repo_name   = "thrypes-se/huerray-web"
  autoscale       = true
  min_replicas    = 1
}

output "endpoints" {
  value       = [for hostname in local.hostnames : "https://${hostname}"]
  description = "The endpoints the service is available on"
}
