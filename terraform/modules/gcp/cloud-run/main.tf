provider "google" {
  project = var.google_project
}

provider "google-beta" {
  project = var.google_project
}

locals {
  env_letter     = substr(var.env, 0, 1)
  env_url_prefix = var.env == "prod" ? "" : local.env_letter
  env_config = {
    SITE_PORT                    = "8080"
    SITE_URL                     = var.config_site_url
    SITE_CONTENT_SECURITY_POLICY = var.config_site_content_security_policy
    GOOGLE_TAGMANAGER_ID         = var.config_google_tagmanager_id
    SENTRY_PROJECT               = var.config_sentry_project
    SENTRY_DSN                   = var.config_sentry_dsn
    SENTRY_ENVIRONMENT           = var.config_sentry_environment
    CONTACT_EMAIL                = var.config_contact_email
    SOCIAL_GITHUB_URL            = var.config_social_github_url
    SOCIAL_STACKOVERFLOW_URL     = var.config_social_stackoverflow_url
    SOCIAL_TWITTER_ID            = var.config_social_twitter_id
    SOCIAL_TWITTER_URL           = var.config_social_twitter_url
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role    = "roles/run.invoker"
    members = ["allUsers"]
  }
}

output "serverless_neg_id" {
  value = google_compute_region_network_endpoint_group.default.id
}
