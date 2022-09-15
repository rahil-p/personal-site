# TODO: support non-production environments by
#  - providing custom url map
#  - accepting workspaces grouped by environment
#  - accepting backend configurations for each environment (especially IAP)
#  - providing non-production urls to `managed_ssl_certificate_domains`

module "lb-http" {
  project = var.google_project

  source  = "GoogleCloudPlatform/lb-http/google//modules/serverless_negs"
  version = "6.3.0"

  name                            = "gcp-site-m-xlb-https"
  ssl                             = true
  managed_ssl_certificate_domains = [""]
  https_redirect                  = true
  quic                            = true

  backends = {
    default = {
      description             = null
      enable_cdn              = true
      custom_request_headers  = null
      custom_response_headers = null
      security_policy         = null
      groups                  = local.groups

      iap_config = {
        enable               = false
        oauth2_client_id     = null
        oauth2_client_secret = null
      }

      log_config = {
        enable      = false
        sample_rate = null
      }
    }
  }
}
