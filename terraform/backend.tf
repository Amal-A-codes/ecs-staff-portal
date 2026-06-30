terraform {
  backend "s3" {
    bucket       = "ecs-staff-portal-tfstate-090777400107"
    key          = "ecs-staff-portal/terraform.tfstate"
    region       = "eu-west-2"
    use_lockfile = true
  }
}