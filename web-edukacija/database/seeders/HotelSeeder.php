<?php

namespace Database\Seeders;

use App\Models\Hotel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HotelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hotels = [
            [
                'hotel_name' => 'Grand Plaza Hotel',
                'address' => '123 Main Street',
                'city' => 'New York',
                'country' => 'United States',
                'email' => 'info@grandplaza.com',
                'phone_number' => '+1-555-0101',
            ],
            [
                'hotel_name' => 'Seaside Resort & Spa',
                'address' => '456 Beach Road',
                'city' => 'Miami',
                'country' => 'United States',
                'email' => 'contact@seasideresort.com',
                'phone_number' => '+1-555-0102',
            ],
            [
                'hotel_name' => 'Mountain View Lodge',
                'address' => '789 Alpine Way',
                'city' => 'Denver',
                'country' => 'United States',
                'email' => 'reservations@mountainview.com',
                'phone_number' => '+1-555-0103',
            ],
        ];

        foreach ($hotels as $hotel) {
            Hotel::create($hotel);
        }
    }
}
