output "vpc_id" {
  value = module.networking.vpc_id
}

output "public_subnet_ids" {
  value = module.networking.public_subnet_ids
}

output "private_subnet_ids" {
  value = module.networking.private_subnet_ids
}

output "alb_sg_id" {
  value = module.security.alb_sg_id
}

output "ecs_sg_id" {
  value = module.security.ecs_sg_id
}

output "alb_dns_name" {
  value = module.alb.alb_dns_name
}

output "ecr_repository_url" {
  value = module.ecr.repository_url
}
output "ecs_cluster_name" {
  value = module.ecs.cluster_name
}

output "ecs_service_name" {
  value = module.ecs.service_name
}
output "acm_validation_options" {
  value = module.acm.domain_validation_options
}
output "acm_certificate_arn" {
  value = module.acm.certificate_arn
}