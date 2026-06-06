# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Laravel 12 application (PHP 8.2+) using Vite for frontend asset compilation with Tailwind CSS v4. The project follows standard Laravel conventions.

## Common Commands

### Development
- `composer dev` - Start development server (port 8000), queue worker, and Vite dev server concurrently
- `php artisan serve` - Start Laravel development server only
- `npm run dev` - Start Vite dev server with hot module replacement

### Testing
- `composer test` - Run full PHPUnit test suite
- `php artisan test` - Alias for running tests
- `vendor/bin/phpunit` - Run PHPUnit directly
- `php artisan test --filter TestClassName` - Run single test class
- `php artisan test tests/Feature/ExampleTest.php` - Run specific test file
- `vendor/bin/phpunit --filter testMethodName` - Run single test method

### Code Quality
- `vendor/bin/pint` - Run Laravel Pint code formatter (PSR-12)

### Database
- `php artisan migrate` - Run database migrations
- `php artisan migrate:fresh` - Drop all tables and re-run migrations
- `php artisan db:seed` - Run database seeders

### Cache & Config
- `php artisan config:clear` - Clear configuration cache
- `php artisan cache:clear` - Clear application cache
- `php artisan view:clear` - Clear compiled views

## Architecture

### Directory Structure
- `app/Http/Controllers/` - Controller classes
- `app/Models/` - Eloquent models
- `app/Providers/` - Service providers (AppServiceProvider for global bindings)
- `routes/web.php` - Web routes
- `routes/api.php` - API routes (prefixed with `/api`, uses `auth:sanctum` middleware)
- `routes/console.php` - Artisan console commands
- `database/migrations/` - Database migrations
- `database/factories/` - Model factories
- `database/seeders/` - Database seeders
- `tests/Feature/` - Feature tests
- `tests/Unit/` - Unit tests
- `resources/views/` - Blade templates
- `resources/css/app.css` - Tailwind CSS entry point
- `resources/js/app.js` - JavaScript entry point

### Frontend Build
- Uses Vite via `laravel-vite-plugin` for asset compilation
- Tailwind CSS v4 loaded via Vite plugin
- Entry points defined in `vite.config.js`: `resources/css/app.css` and `resources/js/app.js`
- Vite HMR automatically refreshes views on changes (ignores `storage/framework/views/**`)

### Testing Configuration
- PHPUnit uses in-memory SQLite (`:memory:`) by default for tests
- Test environment configured in `phpunit.xml`
- Separate Unit and Feature test suites

### PSR-4 Autoloading
- `App\` → `app/`
- `Database\Factories\` → `database/factories/`
- `Database\Seeders\` → `database/seeders/`
- `Tests\` → `tests/`
