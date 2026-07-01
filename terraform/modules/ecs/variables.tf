variable "vpc_id" {
  type = string
}

variable "private_subnet_ids" {
  type = list(string)
}

variable "ecs_sg_id" {
  type = string
}

variable "target_group_arn" {
  type = string
}

variable "ecr_repository_url" {
  type = string
}

variable "image_tag" {
  description = "The image tag to deploy"
  type        = string
  default     = "567b3dc"
}

variable "listener_arn" {
  description = "ALB listener ARN, so ECS service waits for the listener to exist"
  type        = string
}