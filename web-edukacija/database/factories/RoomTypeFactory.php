<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RoomType>
 */
class RoomTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'room_type_name' => fake()->unique()->words(2, true),
            'capacity' => fake()->numberBetween(1, 6),
            'price_per_night' => fake()->randomFloat(2, 50, 500),
            'description' => fake()->sentence(),
        ];
    }
}
