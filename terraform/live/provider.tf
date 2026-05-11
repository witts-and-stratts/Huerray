provider "aws" {
  region = "eu-west-1"
}

terraform {
  required_version = ">= 1"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.8.0"
    }

    random = {
      source  = "hashicorp/random"
      version = "3.7.2"
    }
  }

  backend "s3" {
    bucket = "thrypes-terraform-state"
    region = "eu-west-1"
    key    = "thrypes/live/huerray-web.tfstate"
  }
}
