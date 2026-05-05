<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'reservation_id' => \App\Models\Reservation::factory(),
            'payment_date' => fake()->dateTimeBetween('-1 month', '+1 month')->format('Y-m-d'),
            'amount' => fake()->randomFloat(2, 50, 1000),
            'payment_method' => fake()->randomElement(['credit_card', 'cash', 'bank_transfer', 'paypal']),
            'payment_status' => fake()->randomElement(['pending', 'completed', 'failed', 'refunded']),
            'transaction_code' => fake()->optional(0.8)->unique()->numerify('TXN########'),
        ];
    }
}
