provider "google" {
  project = var.google_project
}

provider "google-beta" {
  project = var.google_project
}

locals {
  groups = [for k, v in data.terraform_remote_state.workspaces : { group = v.outputs.serverless_neg_id }]
}

data "terraform_remote_state" "workspaces" {
  for_each = var.workspaces

  backend = "remote"
  config = {
    organization = "rahil-p"
    workspaces = {
      name = each.value
    }
  }
}
