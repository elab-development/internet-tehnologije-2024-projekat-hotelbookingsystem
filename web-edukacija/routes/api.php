<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HotelController;
use App\Http\Controllers\Api\RoomTypeController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\PaymentController;

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

// Extra specific routes (must be defined before resource routes)
Route::get('/rooms/available', [RoomController::class, 'available']);
Route::get('/hotels/{hotel}/rooms', [HotelController::class, 'rooms']);
Route::get('/reservations/user/{user}', [ReservationController::class, 'userReservations']);

// API Resource routes
Route::apiResource('hotels', HotelController::class);
Route::apiResource('room-types', RoomTypeController::class);
Route::apiResource('rooms', RoomController::class);
Route::apiResource('reservations', ReservationController::class);
Route::apiResource('payments', PaymentController::class);
