<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Teacher;
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
         User::factory(5)->create();

//        User::factory()->create([
//            'name' => 'Test User',
//            'email' => 'test@example.com',
//        ]);

//        $this->call(SettingSeeder::class);
//        Teacher::factory()->count(5)->create();
//        Category::factory(10)->create();
//        $tag = Tag::factory()->count(20)->create();
//        Article::factory()->count(20)->hasAttached(
//            $tag, ['tag_id' => $tag->random()->id]
//        )->create();

    }
}
