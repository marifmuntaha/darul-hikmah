<?php

namespace Database\Factories;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'parent' => fake()->numberBetween(0, 10),
            'name' => fake()->name,
            'email' => fake()->email,
            'content' => fake()->paragraph,
            'read' => '1'
        ];
    }
}
