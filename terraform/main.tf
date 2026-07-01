module "networking" {
  source   = "./modules/networking"
  vpc_cidr = "10.0.0.0/16"
  az_count = 2
}