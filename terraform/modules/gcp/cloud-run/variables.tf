variable "google_project" {
  type        = string
  description = "Project ID for the GCP provider"
}

variable "env" {
  type        = string
  description = "Name of the environment, one of: prod, stage, qa, dev"

  validation {
    condition     = can(regex("^(prod|stage|qa|dev)$", var.env))
    error_message = "The env value must be one of: prod, stage, qa, dev."
  }
}

variable "location" {
  type        = string
  description = "Location in which the resources will be created"
}

variable "location_code" {
  type        = string
  description = "Abbreviated location (for naming purposes)"
}

variable "release_image" {
  type        = string
  description = "Name of the image to release"
  default     = "web-site"
}

variable "release_tag" {
  type        = string
  description = "Tag of the image to release"
}

variable "service_throttle_cpu" {
  type        = bool
  description = ""
  default     = true
}

variable "service_min_instances" {
  type        = number
  description = ""
  default     = 1
}

variable "service_max_instances" {
  type        = number
  description = ""
  default     = 3
}

variable "service_ingress" {
  type = string
  description = ""
  default = "all"
}

variable "service_execution_environment" {
  type        = string
  description = ""
  default     = "gen2"
}

variable "service_timeout_seconds" {
  type        = number
  description = ""
  default     = 60
}

variable "container_cpu_limit" {
  type        = string
  description = ""
  default     = "1000m"
}

variable "container_memory_limit" {
  type        = string
  description = ""
  default     = "512Mi"
}

variable "container_concurrency" {
  type        = number
  description = ""
  default     = 0
}

variable "config_site_url" {
  type        = string
  description = ""
}

variable "config_site_content_security_policy" {
  type        = string
  description = ""
}

variable "config_google_tagmanager_id" {
  type        = string
  description = ""
}

variable "config_sentry_project" {
  type        = string
  description = ""
}

variable "config_sentry_dsn" {
  type        = string
  description = ""
}

variable "config_sentry_environment" {
  type        = string
  description = ""
}

variable "config_contact_email" {
  type        = string
  description = ""
}

variable "config_social_github_url" {
  type        = string
  description = ""
}

variable "config_social_stackoverflow_url" {
  type        = string
  description = ""
}

variable "config_social_twitter_id" {
  type        = string
  description = ""
}

variable "config_social_twitter_url" {
  type        = string
  description = ""
}

