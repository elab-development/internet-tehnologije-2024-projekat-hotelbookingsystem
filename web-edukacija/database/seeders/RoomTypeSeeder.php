<?php

namespace Database\Seeders;

use App\Models\RoomType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoomTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roomTypes = [
            [
                'room_type_name' => 'Standard',
                'capacity' => 2,
                'price_per_night' => 89.99,
                'description' => 'Comfortable standard room with basic amenities',
            ],
            [
                'room_type_name' => 'Deluxe',
                'capacity' => 2,
                'price_per_night' => 149.99,
                'description' => 'Spacious deluxe room with premium amenities',
            ],
            [
                'room_type_name' => 'Family',
                'capacity' => 4,
                'price_per_night' => 199.99,
                'description' => 'Large family room with separate sleeping areas',
            ],
            [
                'room_type_name' => 'Suite',
                'capacity' => 3,
                'price_per_night' => 299.99,
                'description' => 'Luxury suite with living area and premium facilities',
            ],
        ];

        foreach ($roomTypes as $roomType) {
            RoomType::create($roomType);
        }
    }
}
