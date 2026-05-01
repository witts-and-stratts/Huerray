variable "service_version" {
  description = "The version of the service to deploy"
}

variable "env_vars" {
  description = "Environment variables to set for the application"
  type        = map(string)
  default     = {}
}

variable "secrets" {
  description = "Secrets to fetch from secrets manager or parameter store and set as environment variables to set for the application"
  type        = map(string)
  default     = {}
}
