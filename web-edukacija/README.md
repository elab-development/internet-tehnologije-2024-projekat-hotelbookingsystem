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

## Pokretanje aplikacije

Pre pokretanja aplikacije potrebno je pokrenuti MySQL servis kroz XAMPP klikom na dugme **Start** pored MySQL servisa.

### Pokretanje backend dela aplikacije

U Command Prompt terminalu potrebno je pozicionirati se u glavni folder projekta i pokrenuti Laravel server:

```bash
cd C:\Users\Hp\gitRepoTask\internet-tehnologije-2024-projekat-hotelbookingsystem\web-edukacija
php artisan serve --host=127.0.0.1 --port=8000
```

Backend aplikacija biće dostupna na adresi:

```txt
http://127.0.0.1:8000
```

### Pokretanje frontend dela aplikacije

Frontend deo aplikacije pokreće se u Git Bash terminalu:

```bash
cd /c/Users/Hp/gitRepoTask/internet-tehnologije-2024-projekat-hotelbookingsystem/web-edukacija/frontend
npm run dev
```

Frontend aplikacija biće dostupna na adresi:

```txt
http://localhost:3000
```

### Ubacivanje test podataka

Ako je potrebno ubaciti test podatke, odnosno demo admin i manager naloge, koristi se sledeća komanda u Command Prompt-u:

```bash
cd C:\Users\Hp\gitRepoTask\internet-tehnologije-2024-projekat-hotelbookingsystem\web-edukacija
php artisan migrate:fresh --seed
```

Nakon seedovanja ponovo se pokreću backend i frontend deo aplikacije:

```bash
php artisan serve --host=127.0.0.1 --port=8000
```

```bash
cd /c/Users/Hp/gitRepoTask/internet-tehnologije-2024-projekat-hotelbookingsystem/web-edukacija/frontend
npm run dev
```

## Demo accounts

### Admin

- **Email:** admin@gmail.com
- **Password:** admin123

### Manager

- **Email:** manager@gmail.com
- **Password:** manager123

