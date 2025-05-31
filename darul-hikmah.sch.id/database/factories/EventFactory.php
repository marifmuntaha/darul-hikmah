<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image' => 'storage/images/event/image-1.png',
            'title' => $this->faker->sentence(),
            'content' => $this->faker->paragraph(),
            'location' => $this->faker->address(),
            'start' => $this->faker->date(),
            'end' => $this->faker->date(),
            'gallery' => json_encode(['storage/images/event/gallery-1.png'], true),
            'placeholder' => 'storage/images/event/placeholder.png',
        ];
    }
}
