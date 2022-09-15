variable "google_project" {
  type        = string
  description = "Project ID for the GCP provider"
}

variable "workspaces" {
  type        = set(string)
  description = "Workspaces from which to access NEGs"
  default     = []
}
