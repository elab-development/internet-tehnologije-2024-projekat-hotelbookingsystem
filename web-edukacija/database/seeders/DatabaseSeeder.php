<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create users first (8 total)
        User::factory(8)->create();
        
        // Then seed in dependency order
        $this->call([
            HotelSeeder::class,
            RoomTypeSeeder::class,
            RoomSeeder::class,
            ReservationSeeder::class,
            PaymentSeeder::class,
            AdminSeeder::class,
        ]);
    }
}
