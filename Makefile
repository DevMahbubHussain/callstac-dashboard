.PHONY: help build up down restart logs shell migrate seed composer npm install

# Default target
help:
	@echo "Available commands:"
	@echo "  make build        - Build Docker containers"
	@echo "  make up           - Start all services"
	@echo "  make down         - Stop all services"
	@echo "  make restart      - Restart all services"
	@echo "  make logs         - View logs from all containers"
	@echo "  make shell        - Access application container shell"
	@echo "  make migrate      - Run database migrations"
	@echo "  make seed         - Seed the database"
	@echo "  make composer     - Run composer commands"
	@echo "  make npm          - Run npm commands"
	@echo "  make install      - Install and setup everything"

# Build containers
build:
	docker-compose build

# Start services
up:
	docker-compose up -d

# Stop services
down:
	docker-compose down

# Restart services
restart:
	docker-compose restart

# View logs
logs:
	docker-compose logs -f

# Access application shell
shell:
	docker-compose exec app bash

# Run migrations
migrate:
	docker-compose exec app php artisan migrate

# Fresh migrations with seed
fresh:
	docker-compose exec app php artisan migrate:fresh --seed

# Seed database
seed:
	docker-compose exec app php artisan db:seed

# Run composer commands
composer:
	docker-compose exec app composer $(ARGS)

# Run npm commands
npm:
	docker-compose exec app npm $(ARGS)

# Generate app key
key:
	docker-compose exec app php artisan key:generate

# Clear caches
clear:
	docker-compose exec app php artisan config:clear
	docker-compose exec app php artisan cache:clear
	docker-compose exec app php artisan view:clear

# Install and setup everything
install: build up
	@echo "Waiting for services to be ready..."
	@sleep 10
	@echo "Installing dependencies..."
	docker-compose exec app composer install
	docker-compose exec app npm install
	docker-compose exec app php artisan key:generate
	docker-compose exec app php artisan migrate:fresh --seed
	@echo "✅ Installation complete! Access at http://localhost"