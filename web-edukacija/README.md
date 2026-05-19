# Hotel Booking System

Hotel Booking System is a seminar project with a Laravel backend and React frontend. It includes hotel and room browsing, Sanctum authentication, role-based pages, weather lookup, CSV export and demo seed data.

## Technologies

- Laravel
- React + Vite
- MySQL
- Sanctum
- Open-Meteo API

## Backend setup

```bash
composer install
php artisan migrate:fresh --seed
php artisan serve
```

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

## Demo accounts

### Admin

- **Email:** admin@gmail.com
- **Password:** admin123

### Manager

- **Email:** manager@gmail.com
- **Password:** manager123
