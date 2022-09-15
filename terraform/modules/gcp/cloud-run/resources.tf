resource "google_cloud_run_service" "default" {
  project = var.google_project

  name                       = "gcp-site-${local.env_letter}-run-${var.location_code}"
  location                   = var.location
  autogenerate_revision_name = true

  metadata {
    labels = {
      "env" : var.env
    }
    annotations = {
      "run.googleapis.com/client-name" = "terraform"
      "run.googleapis.com/ingress"     = var.service_ingress
    }
  }

  template {
    metadata {
      annotations = {
        "run.googleapis.com/execution-environment" = var.service_execution_environment
        "run.googleapis.com/cpu-throttling"        = var.service_throttle_cpu
        "autoscaling.knative.dev/maxScale"         = var.service_max_instances
        "autoscaling.knative.dev/minScale"         = var.service_min_instances
      }
    }

    spec {
      timeout_seconds       = var.service_timeout_seconds
      container_concurrency = var.container_concurrency

      containers {
        image = "us-docker.pkg.dev/${var.google_project}/services/${var.release_image}:${var.release_tag}"

        resources {
          limits = {
            memory = var.container_memory_limit
            cpu    = var.container_cpu_limit
          }
        }

        dynamic "env" {
          for_each = local.env_config

          content {
            name  = env.key
            value = env.value
          }
        }
      }
    }
  }
}

# TODO: a different policy should be used for non-production environments
resource "google_cloud_run_service_iam_policy" "noauth" {
  project  = var.google_project
  location = google_cloud_run_service.default.location
  service  = google_cloud_run_service.default.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_compute_region_network_endpoint_group" "default" {
  provider              = google-beta
  name                  = "gcp-site-${local.env_letter}-neg-${var.location_code}"
  network_endpoint_type = "SERVERLESS"
  region                = var.location

  cloud_run {
    service = google_cloud_run_service.default.name
  }
}
