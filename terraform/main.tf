module "networking" {
  source   = "./modules/networking"
  vpc_cidr = "10.0.0.0/16"
  az_count = 2
}

module "security" {
  source = "./modules/security"
  vpc_id = module.networking.vpc_id
}

