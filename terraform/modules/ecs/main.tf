resource "aws_ecs_cluster" "main" {
  name = "ecs-staff-portal-cluster"

  setting {
    name  = "containerInsights"
    value = "disabled"
  }

  tags = {
    Name = "ecs-staff-portal-cluster"
  }
}

resource "aws_cloudwatch_log_group" "main" {
  name              = "/ecs/ecs-staff-portal"
  retention_in_days = 7
}

# Execution role: lets ECS pull the image from ECR and write logs
resource "aws_iam_role" "execution" {
  name = "ecs-staff-portal-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "execution" {
  role       = aws_iam_role.execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Task role: permissions the *running app* has (currently minimal - none needed yet)
resource "aws_iam_role" "task" {
  name = "ecs-staff-portal-task-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
    }]
  })
}

resource "aws_ecs_task_definition" "main" {
  family                   = "ecs-staff-portal"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.execution.arn
  task_role_arn            = aws_iam_role.task.arn

  container_definitions = jsonencode([
    {
      name      = "ecs-staff-portal"
      image     = "${var.ecr_repository_url}:${var.image_tag}"
      essential = true

      portMappings = [
        {
          containerPort = 8080
          protocol      = "tcp"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.main.name
          "awslogs-region"        = "eu-west-2"
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])

  tags = {
    Name = "ecs-staff-portal-task"
  }
}

resource "aws_ecs_service" "main" {
  name            = "ecs-staff-portal-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.main.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.private_subnet_ids
    security_groups  = [var.ecs_sg_id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = var.target_group_arn
    container_name   = "ecs-staff-portal"
    container_port   = 8080
  }

  depends_on = [var.listener_arn]
}