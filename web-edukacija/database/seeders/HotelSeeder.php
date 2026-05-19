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
                'address' => '123 Friedrichstrasse',
                'city' => 'Berlin',
                'country' => 'Germany',
                'email' => 'info@grandplaza.com',
                'phone_number' => '+49-555-0101',
            ],
            [
                'hotel_name' => 'Seaside Resort & Spa',
                'address' => '456 La Rambla',
                'city' => 'Barcelona',
                'country' => 'Spain',
                'email' => 'contact@seasideresort.com',
                'phone_number' => '+34-555-0102',
            ],
            [
                'hotel_name' => 'Mountain View Lodge',
                'address' => '789 Corso Vittorio Emanuele',
                'city' => 'Torin',
                'country' => 'Italy',
                'email' => 'reservations@mountainview.com',
                'phone_number' => '+39-555-0103',
            ],
            [
                'hotel_name' => 'Hotel Balkan View',
                'address' => '15 Knez Mihailova Street',
                'city' => 'Belgrade',
                'country' => 'Serbia',
                'email' => 'info@balkanview.com',
                'phone_number' => '+381-11-555-0104',
            ],
            [
                'hotel_name' => 'Adriatic Palace Hotel',
                'address' => '22 Riva Promenade',
                'city' => 'Split',
                'country' => 'Croatia',
                'email' => 'contact@adriaticpalace.com',
                'phone_number' => '+385-21-555-0105',
            ],
            [
                'hotel_name' => 'Danube Central Hotel',
                'address' => '8 Ringstrasse',
                'city' => 'Vienna',
                'country' => 'Austria',
                'email' => 'reservations@danubecentral.com',
                'phone_number' => '+43-1-555-0106',
            ],
            [
                'hotel_name' => 'Alpine Garden Hotel',
                'address' => '12 Tivoli Road',
                'city' => 'Ljubljana',
                'country' => 'Slovenia',
                'email' => 'info@alpinegarden.com',
                'phone_number' => '+386-1-555-0107',
            ],
            [
                'hotel_name' => 'Royal Prague Suites',
                'address' => '5 Old Town Square',
                'city' => 'Prague',
                'country' => 'Czech Republic',
                'email' => 'booking@royalpraguesuites.com',
                'phone_number' => '+420-2-555-0108',
            ],
        ];

        foreach ($hotels as $hotel) {
            Hotel::updateOrCreate(
                ['email' => $hotel['email']],
                $hotel
            );
        }
    }
}
