# TODO: support non-production environments by
#  - accepting workspaces grouped by environment
#  - accepting backend configurations for each environment (especially IAP)
#  - providing custom url map
#  - providing non-production urls to `managed_ssl_certificate_domains`

resource "google_compute_global_forwarding_rule" "http" {
  provider   = google-beta
  project    = var.google_project
  name       = "gcp-site-m-xlb-http"
  target     = google_compute_target_http_proxy.default.self_link
  ip_address = google_compute_global_address.default.address
  port_range = "80"
}

resource "google_compute_global_forwarding_rule" "https" {
  provider   = google-beta
  project    = var.google_project
  name       = "gcp-site-m-xlb-https"
  target     = google_compute_target_https_proxy.default.self_link
  ip_address = google_compute_global_address.default.address
  port_range = "443"
}

resource "google_compute_global_address" "default" {
  provider   = google-beta
  project    = var.google_project
  name       = "gcp-site-m-xlb-address"
  ip_version = "IPV4"
}

resource "google_compute_target_http_proxy" "default" {
  project = var.google_project
  name    = "gcp-site-m-xlb-http-proxy"
  url_map = google_compute_url_map.https_redirect.self_link
}

resource "google_compute_target_https_proxy" "default" {
  project = var.google_project
  name    = "gcp-site-m-xlb-https-proxy"
  url_map = google_compute_url_map.default.self_link

  ssl_certificates = [google_compute_managed_ssl_certificate.default.self_link]
  #  ssl_policy       = var.ssl_policy
  quic_override = "ENABLE"
}

resource "google_compute_managed_ssl_certificate" "default" {
  provider = google-beta
  project  = var.google_project
  name     = "gcp-site-m-xlb-cert"

  lifecycle {
    create_before_destroy = true
  }

  managed {
    domains = ["rahil-p.com", "www.rahil-p.com"]
  }
}

resource "google_compute_url_map" "default" {
  project         = var.google_project
  name            = "gcp-site-m-xlb-urlmap-default"
  default_service = google_compute_backend_service.default.self_link
}

resource "google_compute_url_map" "https_redirect" {
  project = var.google_project
  name    = "gcp-site-m-xlb-urlmap-redirect"
  default_url_redirect {
    https_redirect         = true
    redirect_response_code = "MOVED_PERMANENTLY_DEFAULT"
    strip_query            = false
  }
}

resource "google_compute_backend_service" "default" {
  provider = google-beta
  project  = var.google_project

  name                            = "gcp-site-m-xlb-backend-default"
  port_name                       = "http"
  protocol                        = "HTTP"
  load_balancing_scheme           = "EXTERNAL"
  timeout_sec                     = 30
  description                     = null
  connection_draining_timeout_sec = 300
  enable_cdn                      = true
  custom_request_headers          = []
  custom_response_headers         = []
  health_checks                   = []
  session_affinity                = "NONE"
  affinity_cookie_ttl_sec         = 0
  security_policy                 = null

  dynamic "backend" {
    for_each = toset(local.groups)

    content {
      group = lookup(backend.value, "group")
    }
  }

  cdn_policy {
    cache_mode                   = "USE_ORIGIN_HEADERS"
    negative_caching             = true
    client_ttl                   = 3600    # 1 hour
    default_ttl                  = 3600    # 1 hour
    max_ttl                      = 7776000 # 90 days
    serve_while_stale            = 86400   # 1 day
    signed_url_cache_max_age_sec = 0
  }

  log_config {
    enable      = false
    sample_rate = null
  }

  lifecycle {
    ignore_changes = [backend]
  }
}
