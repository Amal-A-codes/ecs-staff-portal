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

module "ecr" {
  source = "./modules/ecr"
}

module "ecs" {
  source             = "./modules/ecs"
  vpc_id             = module.networking.vpc_id
  private_subnet_ids = module.networking.private_subnet_ids
  ecs_sg_id          = module.security.ecs_sg_id
  target_group_arn   = module.alb.target_group_arn
  ecr_repository_url = module.ecr.repository_url
  image_tag          = "fix3"
  listener_arn       = module.alb.listener_arn
}
module "acm" {
  source      = "./modules/acm"
  domain_name = "amalatmani.com"
}