# Hotel Booking System

Hotel Booking System is a seminar project with a Laravel backend and React frontend. It includes hotel and room browsing, Sanctum authentication, role-based pages, weather lookup, CSV export and demo seed data.

## Technologies

- Laravel
- React + Vite
- MySQL
- Sanctum
- Open-Meteo API

## Features

- **Authentication:** Users can register, log in and log out using Sanctum authentication.
- **Hotel browsing:** Hotels are loaded from the Laravel API and displayed with pagination.
- **Hotel search:** Hotels can be searched by name, city or country.
- **Weather lookup:** Hotel weather data is fetched from the public Open-Meteo API.
- **CSV export:** Hotel and room data can be exported in CSV format.
- **Room browsing:** Rooms are loaded from the Laravel API and displayed as cards.
- **Room filtering and sorting:** Rooms can be filtered by status, searched by room number and sorted.
- **Role-based pages:** Admin and manager sections are available through protected routes.

## Roles

- **User:** Can browse hotels and rooms and use booking-related UI.
- **Manager:** Can access `/manager` and view a reservations overview.
- **Admin:** Can access `/admin` and view a hotels overview.

## API Overview

The Laravel API includes resource groups for authentication, hotels, rooms, reservations and payments.

Example routes:

- `POST /api/login`
- `POST /api/register`
- `GET /api/hotels`
- `GET /api/rooms`
- `GET /api/reservations`

Modifying routes are protected with Sanctum authentication.

## Project Structure

- **`frontend/`:** React + Vite frontend application.
- **Laravel backend app:** Models, migrations, controllers and API routes.
- **Seeders:** Demo data for users, hotels, rooms, reservations and payments.
- **API controllers:** Handle API requests for backend resources.
- **React pages/components/hooks/services:** Frontend screens, reusable UI, auth helpers and API functions.

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

This project was developed as a seminar project for Internet Technologies.
