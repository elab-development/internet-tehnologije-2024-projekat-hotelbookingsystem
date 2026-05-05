<?php

namespace Database\Seeders;

use App\Models\Room;
use App\Models\Hotel;
use App\Models\RoomType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rooms = [
            // Grand Plaza Hotel (ID: 1)
            ['hotel_id' => 1, 'room_type_id' => 1, 'room_number' => '101', 'floor_number' => 1, 'status' => 'available'], // Standard
            ['hotel_id' => 1, 'room_type_id' => 1, 'room_number' => '102', 'floor_number' => 1, 'status' => 'available'], // Standard
            ['hotel_id' => 1, 'room_type_id' => 2, 'room_number' => '201', 'floor_number' => 2, 'status' => 'available'], // Deluxe
            ['hotel_id' => 1, 'room_type_id' => 3, 'room_number' => '301', 'floor_number' => 3, 'status' => 'available'], // Family
            
            // Seaside Resort & Spa (ID: 2)
            ['hotel_id' => 2, 'room_type_id' => 1, 'room_number' => '101', 'floor_number' => 1, 'status' => 'available'], // Standard
            ['hotel_id' => 2, 'room_type_id' => 2, 'room_number' => '201', 'floor_number' => 2, 'status' => 'available'], // Deluxe
            ['hotel_id' => 2, 'room_type_id' => 4, 'room_number' => '301', 'floor_number' => 3, 'status' => 'available'], // Suite
            ['hotel_id' => 2, 'room_type_id' => 3, 'room_number' => '401', 'floor_number' => 4, 'status' => 'available'], // Family
            
            // Mountain View Lodge (ID: 3)
            ['hotel_id' => 3, 'room_type_id' => 1, 'room_number' => '101', 'floor_number' => 1, 'status' => 'available'], // Standard
            ['hotel_id' => 3, 'room_type_id' => 2, 'room_number' => '201', 'floor_number' => 2, 'status' => 'available'], // Deluxe
            ['hotel_id' => 3, 'room_type_id' => 1, 'room_number' => '102', 'floor_number' => 1, 'status' => 'available'], // Standard
            ['hotel_id' => 3, 'room_type_id' => 3, 'room_number' => '301', 'floor_number' => 3, 'status' => 'available'], // Family
        ];

        foreach ($rooms as $room) {
            Room::create($room);
        }
    }
}
