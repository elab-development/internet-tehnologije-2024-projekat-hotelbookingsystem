<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $checkIn = fake()->dateTimeBetween('+1 week', '+3 months');
        $checkOut = (clone $checkIn)->modify('+'.fake()->numberBetween(1, 7).' days');
        
        return [
            'user_id' => \App\Models\User::factory(),
            'room_id' => \App\Models\Room::factory(),
            'reservation_code' => 'RES-' . fake()->unique()->numerify('########'),
            'reservation_status' => fake()->randomElement(['pending', 'confirmed', 'cancelled', 'completed']),
            'check_in_date' => $checkIn->format('Y-m-d'),
            'check_out_date' => $checkOut->format('Y-m-d'),
            'guest_count' => fake()->numberBetween(1, 4),
            'notes' => fake()->optional(0.7)->sentence(),
        ];
    }
}
