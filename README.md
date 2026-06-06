# CallStac - Call Center Dashboard

A comprehensive call center management dashboard built with **Laravel 12** and **React 18**, featuring real-time metrics, agent management, call tracking, and performance analytics.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Laravel](https://img.shields.io/badge/Laravel-12.x-red.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![PHP](https://img.shields.io/badge/PHP-8.2+-purple.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)

## 🚀 Features

### Dashboard Overview
- **Real-time Metrics**: Total calls, active agents, average call duration, missed calls
- **Live Updates**: Auto-refreshes every 10 seconds
- **Active Calls Panel**: View currently active calls with agent details
- **Agent Availability**: Real-time agent status tracking (available, on break, offline)

### Agent Management
- **Agent Directory**: Complete list of call center agents
- **Status Management**: Update agent availability in real-time
- **Performance Statistics**: View individual agent metrics
- **Contact Information**: Quick access to agent details

### Call Management
- **Call History**: Comprehensive call logs with filtering
- **Active Calls**: Monitor ongoing calls
- **Call Details**: Customer information, duration, status
- **Advanced Filtering**: Search by customer name, phone, or status

### Reports & Analytics
- **Call Volume Trends**: Visualize call patterns over time
- **Agent Performance**: Compare individual and team performance
- **Disposition Summary**: Call outcome analysis
- **Export Functionality**: Generate reports in various formats

## 📋 Requirements

### Traditional Installation
- **PHP**: 8.2 or higher
- **Composer**: 2.x or higher
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Database**: MySQL 8.0+ or PostgreSQL 12+
- **Laravel**: 12.x

### Docker Installation (Recommended)
- **Docker**: 20.10+ and Docker Compose 2.0+
- No PHP, Node.js, or database installation required
- All dependencies included in containers

## 🔧 Installation

### Choose Your Installation Method

**🐳 Docker (Recommended)** - Fastest setup, all dependencies included
**🔧 Traditional** - Full control, local development setup

---

## 🐳 Docker Installation (Recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/DevMahbubHussain/callstac-dashboard.git
cd callstac-dashboard
git checkout feature/call-center-dashboard
```

### 2. Quick Start with Makefile

```bash
# Build and start all services
make build
make up

# Generate application key
make key

# Setup database with seed data
make fresh

# Access at http://localhost
```

### 3. Manual Docker Start

```bash
# Configure environment
cp .docker.env .env

# Build containers
docker-compose build

# Start services
docker-compose up -d

# Setup application
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan migrate:fresh --seed
```

### 4. Access the Application

Open your browser at: **http://localhost**

---

## 🔧 Traditional Installation

### 1. Clone the Repository

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install JavaScript Dependencies

```bash
npm install
```

### 4. Environment Configuration

```bash
cp .env.example .env
php artisan key:generate
```

### 5. Database Setup

Update your `.env` file with your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=callstac
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 6. Run Migrations and Seeders

```bash
php artisan migrate:fresh --seed
```

This will create:
- 10 sample agents with various statuses
- 6 sample calls (4 active, 2 completed)
- Sample customers and call dispositions

## 🐳 Docker Deployment

### Quick Docker Start

The fastest way to get started with Docker:

```bash
# Clone and setup
git clone https://github.com/DevMahbubHussain/callstac-dashboard.git
cd callstac-dashboard
git checkout feature/call-center-dashboard

# Build and start all services
make build
make up

# Wait for services to be ready, then setup
sleep 10
make key
make fresh

# Access the application
open http://localhost
```

### Docker Services

Our Docker setup includes:

- **nginx**: Web server (port 80)
- **app**: Laravel PHP-FPM application
- **mysql**: MySQL 8.0 database (port 3306)
- **redis**: Redis for caching and queues (port 6379)
- **queue-worker**: Laravel background job processor
- **scheduler**: Laravel task scheduler (cron)

### Docker Commands

#### Using Makefile (Recommended)

```bash
# Build containers
make build

# Start all services
make up

# Stop all services
make down

# Restart services
make restart

# View logs
make logs

# Access application shell
make shell

# Run migrations
make migrate

# Fresh migration with seed data
make fresh

# Run composer commands
make composer ARGS="require laravel/sanctum"

# Run npm commands
make npm ARGS="run build"

# Clear all caches
make clear
```

#### Using docker-compose directly

```bash
# Build and start
docker-compose up -d --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Access application container
docker-compose exec app bash

# Run artisan commands
docker-compose exec app php artisan migrate:fresh --seed

# Install composer packages
docker-compose exec app composer install

# Run npm commands
docker-compose exec app npm install
```

### Docker Environment Variables

Create a `.docker.env` file for Docker-specific configuration:

```env
# Application
APP_NAME=CallStac
APP_ENV=production
APP_KEY=base64:your-generated-app-key-here
APP_DEBUG=false
APP_URL=http://localhost

# Database
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=callstac
DB_USERNAME=callstac_user
DB_PASSWORD=callstac_password

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Queue
QUEUE_CONNECTION=redis

# Cache
CACHE_DRIVER=redis
SESSION_DRIVER=redis
```

### Development with Docker

For development with hot-reload:

```bash
# Use development docker-compose
docker-compose -f docker-compose.dev.yml up -d

# Access logs
docker-compose -f docker-compose.dev.yml logs -f
```

### Production Docker Deployment

#### 1. Configure Environment

```bash
# Copy environment template
cp .docker.env .env

# Generate application key
php artisan key:generate

# Update production values in .env
nano .env
```

#### 2. Build and Deploy

```bash
# Build production containers
docker-compose build

# Start production services
docker-compose up -d

# Run migrations
docker-compose exec app php artisan migrate --force

# Seed production data (optional)
docker-compose exec app php artisan db:seed --force

# Optimize application
docker-compose exec app php artisan config:cache
docker-compose exec app php artisan route:cache
docker-compose exec app php artisan view:cache
```

#### 3. Production Considerations

- **SSL/TLS**: Configure nginx with SSL certificates
- **Environment Variables**: Never commit `.env` files
- **Database Backups**: Implement regular backup strategy
- **Monitoring**: Set up logging and monitoring
- **Scaling**: Use Docker Swarm or Kubernetes for scaling

### Docker Troubleshooting

#### Container won't start

```bash
# Check logs
docker-compose logs app

# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

#### Database connection issues

```bash
# Verify MySQL container is running
docker-compose ps mysql

# Check MySQL logs
docker-compose logs mysql

# Restart database
docker-compose restart mysql
```

#### Permission issues

```bash
# Fix storage permissions
docker-compose exec app chown -R www-data:www-data storage bootstrap/cache

# Give write permissions
docker-compose exec app chmod -R 775 storage bootstrap/cache
```

#### View container resource usage

```bash
docker stats
```

### Docker Architecture

```
┌─────────────┐
│  nginx:80   │ ← Public access
└──────┬──────┘
       │
┌──────▼──────────┐
│  app:9000      │ ← PHP-FPM
└──────┬──────────┘
       │
┌──────▼──────────┐      ┌──────────────┐
│  mysql:3306    │      │ redis:6379   │
└─────────────────┘      └──────────────┘
       │                       │
┌──────▼──────────┐      ┌──────▼───────┐
│ queue-worker   │─────→│   redis     │
└─────────────────┘      └──────────────┘
       │
┌──────▼──────────┐
│  scheduler     │ ← Cron jobs
└─────────────────┘
```

### Docker Volumes

- **mysql_data**: Persistent MySQL data storage
- **Redis**: In-memory (use volume for persistence if needed)

## 🎯 Quick Start

### Development Environment

Start all development servers (Laravel, Vite, Queue Worker):

```bash
composer dev
```

This starts:
- **Laravel Server**: http://localhost:8000
- **Vite Dev Server**: http://localhost:5173 (or next available port)
- **Queue Worker**: Background job processing

### Individual Server Commands

```bash
# Start Laravel server only
php artisan serve

# Start Vite dev server only
npm run dev

# Start queue worker
php artisan queue:listen --tries=1
```

### Access the Dashboard

Open your browser and navigate to:
```
http://localhost:8000
```

## 🏗️ Project Structure

```
callstac-dashboard/
├── app/
│   ├── Http/Controllers/
│   │   ├── AgentController.php       # Agent management
│   │   ├── CallController.php        # Call operations
│   │   ├── DashboardController.php   # Dashboard metrics
│   │   └── ReportController.php      # Analytics & reports
│   └── Models/
│       ├── Agent.php                 # Agent model
│       ├── Call.php                  # Call model
│       └── Customer.php              # Customer model
├── resources/
│   ├── js/
│   │   ├── components/               # React components
│   │   ├── pages/                    # Page components
│   │   ├── context/                  # React Context API
│   │   └── services/                 # API services
│   └── views/
│       └── app.blade.php             # Main template
├── routes/
│   ├── api.php                       # API routes
│   └── web.php                       # Web routes
└── database/
    ├── migrations/                   # Database migrations
    └── seeders/                      # Sample data seeders
```

## 🔌 API Endpoints

### Agents
- `GET /api/agents` - List all agents
- `GET /api/agents/{id}` - Get agent details
- `PATCH /api/agents/{id}/status` - Update agent status
- `GET /api/agents/{id}/statistics` - Get agent statistics

### Calls
- `GET /api/calls` - List all calls with filtering
- `GET /api/calls/active` - Get active calls
- `GET /api/calls/missed` - Get missed calls
- `POST /api/calls` - Create new call
- `PATCH /api/calls/{id}` - Update call details

### Dashboard
- `GET /api/dashboard/overview` - Dashboard metrics
- `GET /api/dashboard/live-stats` - Real-time statistics
- `GET /api/dashboard/agent-performance` - Performance data

### Reports
- `GET /api/reports/call-volume` - Call volume analytics
- `GET /api/reports/agent-performance` - Performance reports
- `GET /api/reports/disposition-summary` - Call outcomes

## 🎨 Frontend Stack

- **React 18**: UI framework with hooks and context
- **Vite**: Fast build tool with HMR
- **Tailwind CSS v4**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Lucide Icons**: Modern icon library
- **Recharts**: Data visualization charts

## 🔐 Security Features

- **CORS Configuration**: Configured for API access
- **Input Validation**: Request validation on all endpoints
- **Database Protection**: SQL injection prevention via Eloquent ORM
- **CSRF Protection**: Enabled for web routes
- **API Authentication**: Ready for Sanctum integration

## 🧪 Testing

### Run All Tests

```bash
php artisan test
```

### Run Specific Test Suite

```bash
# Feature tests
php artisan test --filter Feature

# Unit tests  
php artisan test --filter Unit

# Specific test class
php artisan test --filter DashboardTest
```

### Available Tests

- `DashboardTest`: Dashboard metrics and API endpoints
- `AgentTest`: Agent management operations
- `CallTest`: Call tracking and updates

## 📊 Sample Data

The included seeders create:

### Agents (10 total)
- 3 Available agents
- 2 Online agents
- 3 On Break agents
- 2 Offline agents

### Calls (6 total)
- 4 Active calls (in progress)
- 1 Completed call
- 1 Missed call

### Call Dispositions
- Completed
- Missed
- Abandoned
- Follow-up Required
- Voicemail

## 🔧 Configuration Files

### Vite Configuration

`vite.config.js` handles:
- React JSX compilation
- Tailwind CSS integration
- Laravel plugin configuration
- Development server setup

### Laravel Configuration

Key configuration files:
- `config/cors.php` - CORS settings
- `config/database.php` - Database connections
- `bootstrap/app.php` - Application bootstrap

## 🚨 Troubleshooting

### Docker Issues

#### Container won't start
```bash
# Check logs
docker-compose logs app

# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

#### Database connection in Docker
```bash
# Verify MySQL container
docker-compose ps mysql

# Check MySQL logs
docker-compose logs mysql

# Restart database
docker-compose restart mysql
```

#### Permission issues
```bash
# Fix storage permissions
docker-compose exec app chown -R www-data:www-data storage bootstrap/cache

# Give write permissions
docker-compose exec app chmod -R 775 storage bootstrap/cache
```

### Traditional Installation Issues

#### White Screen Issues

1. **Clear caches**:
```bash
php artisan config:clear
php artisan cache:clear
npm run dev -- --force
```

2. **Check Vite server** is running on correct port
3. **Verify CORS configuration** in `config/cors.php`

#### API Not Responding

1. **Check database connection** in `.env`
2. **Run migrations**: `php artisan migrate:fresh`
3. **Verify API routes**: `php artisan route:list --api`

#### React Errors

1. **Check browser console** for JavaScript errors
2. **Ensure all dependencies installed**: `npm install`
3. **Restart Vite dev server**

## 🔄 Real-time Updates

The dashboard uses auto-refresh every 10 seconds to update:
- Active calls
- Agent statuses
- Dashboard metrics
- Performance statistics

## 📝 Development Commands

```bash
# Code formatting
vendor/bin/pint

# Clear all caches
php artisan config:clear
php artisan cache:clear
php artisan view:clear

# Generate new controller
php artisan make:controller MyController

# Generate new model
php artisan make:model MyModel

# Create new migration
php artisan make:migration create_my_table
```

## 🎯 Roadmap

- [ ] WebSocket integration for real-time updates
- [ ] Advanced reporting with export functionality
- [ ] Call recording management
- [ ] SMS notifications for missed calls
- [ ] Agent performance dashboards
- [ ] Customer relationship management features
- [ ] Multi-location support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes with descriptive messages
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open-sourced software licensed under the MIT license.

## 👥 Author

Built with ❤️ using Laravel 12 and React 18

---

**Note**: This is a development-ready application. For production deployment, ensure you:
- Set proper environment variables
- Configure production database
- Enable HTTPS/SSL certificates
- Set up proper authentication
- Configure production-ready CORS settings
- Use Docker for production deployment
- Implement proper monitoring and logging
- Set up database backup strategies
- Configure firewall and security policies
