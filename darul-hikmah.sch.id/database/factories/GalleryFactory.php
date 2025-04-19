<?php

namespace Database\Factories;

use App\Models\Gallery;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Gallery>
 */
class GalleryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->word(),
            'content' => $this->faker->paragraph(),
            'images' => [
                'storage/images/gallery/img-1.png',
                'storage/images/gallery/img-2.png',
                'storage/images/gallery/img-3.png',
                'storage/images/gallery/img-4.png',
                'storage/images/gallery/gallery-1.png',
            ]
        ];
    }
}
