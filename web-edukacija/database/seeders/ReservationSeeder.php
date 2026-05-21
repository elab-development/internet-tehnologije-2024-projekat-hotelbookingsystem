<?php

namespace Database\Seeders;

use App\Models\Reservation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reservations = [
            [
                'user_id' => 1, // First user
                'room_id' => 1, // Grand Plaza Hotel - Room 101
                'reservation_code' => 'RES-20240001',
                'reservation_status' => 'confirmed',
                'check_in_date' => '2024-06-15',
                'check_out_date' => '2024-06-18',
                'guest_count' => 2,
                'notes' => 'Late arrival expected',
            ],
            [
                'user_id' => 2, // Second user
                'room_id' => 5, // Seaside Resort - Room 101
                'reservation_code' => 'RES-20240002',
                'reservation_status' => 'confirmed',
                'check_in_date' => '2024-07-01',
                'check_out_date' => '2024-07-05',
                'guest_count' => 2,
                'notes' => null,
            ],
            [
                'user_id' => 3, // Third user
                'room_id' => 7, // Seaside Resort - Suite 301
                'reservation_code' => 'RES-20240003',
                'reservation_status' => 'pending',
                'check_in_date' => '2024-08-10',
                'check_out_date' => '2024-08-12',
                'guest_count' => 3,
                'notes' => 'Anniversary celebration',
            ],
            [
                'user_id' => 4, // Fourth user
                'room_id' => 9, // Mountain View Lodge - Room 101
                'reservation_code' => 'RES-20240004',
                'reservation_status' => 'completed',
                'check_in_date' => '2024-05-01',
                'check_out_date' => '2024-05-03',
                'guest_count' => 1,
                'notes' => 'Business trip',
            ],
            [
                'user_id' => 5, // Fifth user
                'room_id' => 2, // Grand Plaza Hotel - Room 102
                'reservation_code' => 'RES-20240005',
                'reservation_status' => 'confirmed',
                'check_in_date' => '2024-09-20',
                'check_out_date' => '2024-09-25',
                'guest_count' => 2,
                'notes' => null,
            ],
            [
                'user_id' => 6, // Sixth user
                'room_id' => 10, // Mountain View Lodge - Deluxe 201
                'reservation_code' => 'RES-20240006',
                'reservation_status' => 'cancelled',
                'check_in_date' => '2024-06-01',
                'check_out_date' => '2024-06-02',
                'guest_count' => 2,
                'notes' => 'Cancelled due to emergency',
            ],
            [
                'user_id' => 7, // Seventh user
                'room_id' => 4, // Grand Plaza Hotel - Family 301
                'reservation_code' => 'RES-20240007',
                'reservation_status' => 'confirmed',
                'check_in_date' => '2024-07-15',
                'check_out_date' => '2024-07-20',
                'guest_count' => 4,
                'notes' => 'Family vacation with children',
            ],
            [
                'user_id' => 8, // Eighth user
                'room_id' => 12, // Mountain View Lodge - Family 301
                'reservation_code' => 'RES-20240008',
                'reservation_status' => 'confirmed',
                'check_in_date' => '2024-10-05',
                'check_out_date' => '2024-10-08',
                'guest_count' => 3,
                'notes' => 'Mountain hiking trip',
            ],
        ];

        foreach ($reservations as $reservation) {
            Reservation::create($reservation);
        }
    }
}
