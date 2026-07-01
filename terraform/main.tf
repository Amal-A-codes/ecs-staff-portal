module "networking" {
  source   = "./modules/networking"
  vpc_cidr = "10.0.0.0/16"
  az_count = 2
}

module "security" {
  source = "./modules/security"
  vpc_id = module.networking.vpc_id
}

module "alb" {
  source            = "./modules/alb"
  vpc_id            = module.networking.vpc_id
  public_subnet_ids = module.networking.public_subnet_ids
  alb_sg_id         = module.security.alb_sg_id
}