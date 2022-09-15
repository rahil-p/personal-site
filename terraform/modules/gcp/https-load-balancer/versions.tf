terraform {
  required_version = "~> 1.1"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.36.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "4.36.0"
    }
  }
}
