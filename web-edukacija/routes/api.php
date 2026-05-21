<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HotelController;
use App\Http\Controllers\Api\RoomTypeController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public GET routes for hotels
Route::get('/hotels', [HotelController::class, 'index']);
Route::get('/hotels/{hotel}', [HotelController::class, 'show']);
Route::get('/hotels/{hotel}/rooms', [HotelController::class, 'rooms']);

// Public GET routes for room types
Route::get('/room-types', [RoomTypeController::class, 'index']);
Route::get('/room-types/{roomType}', [RoomTypeController::class, 'show']);

// Public GET routes for rooms (specific routes first)
Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/rooms/available', [RoomController::class, 'available']);
Route::get('/rooms/{room}', [RoomController::class, 'show']);

// Public GET routes for reservations (specific routes first)
Route::get('/reservations', [ReservationController::class, 'index']);
Route::get('/reservations/user/{user}', [ReservationController::class, 'userReservations']);
Route::get('/reservations/{reservation}', [ReservationController::class, 'show']);

// Public GET routes for payments
Route::get('/payments', [PaymentController::class, 'index']);
Route::get('/payments/{payment}', [PaymentController::class, 'show']);

// Protected routes requiring authentication
Route::middleware('auth:sanctum')->group(function () {
    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Hotels (POST, PUT/PATCH, DELETE)
    Route::post('/hotels', [HotelController::class, 'store']);
    Route::put('/hotels/{hotel}', [HotelController::class, 'update']);
    Route::patch('/hotels/{hotel}', [HotelController::class, 'update']);
    Route::delete('/hotels/{hotel}', [HotelController::class, 'destroy']);
    
    // Room Types (POST, PUT/PATCH, DELETE)
    Route::post('/room-types', [RoomTypeController::class, 'store']);
    Route::put('/room-types/{roomType}', [RoomTypeController::class, 'update']);
    Route::patch('/room-types/{roomType}', [RoomTypeController::class, 'update']);
    Route::delete('/room-types/{roomType}', [RoomTypeController::class, 'destroy']);
    
    // Rooms (POST, PUT/PATCH, DELETE)
    Route::post('/rooms', [RoomController::class, 'store']);
    Route::put('/rooms/{room}', [RoomController::class, 'update']);
    Route::patch('/rooms/{room}', [RoomController::class, 'update']);
    Route::delete('/rooms/{room}', [RoomController::class, 'destroy']);
    
    // Reservations (POST, PUT/PATCH, DELETE)
    Route::post('/reservations', [ReservationController::class, 'store']);
    Route::put('/reservations/{reservation}', [ReservationController::class, 'update']);
    Route::patch('/reservations/{reservation}', [ReservationController::class, 'update']);
    Route::delete('/reservations/{reservation}', [ReservationController::class, 'destroy']);
    
    // Payments (POST, PUT/PATCH, DELETE)
    Route::post('/payments', [PaymentController::class, 'store']);
    Route::put('/payments/{payment}', [PaymentController::class, 'update']);
    Route::patch('/payments/{payment}', [PaymentController::class, 'update']);
    Route::delete('/payments/{payment}', [PaymentController::class, 'destroy']);
});
