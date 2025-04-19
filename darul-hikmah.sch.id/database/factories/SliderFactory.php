<?php

namespace Database\Factories;

use App\Models\Slider;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Slider>
 */
class SliderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'background' => '/storage/images/slider/bg-1.png',
            'image' => '/storage/images/slider/img-1.png',
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'button' => [
                ['text' => $this->faker->word, 'link' => $this->faker->url()],
                ['text' => $this->faker->word, 'link' => $this->faker->url()],
            ],
            'status' => '1'
        ];
    }
}
