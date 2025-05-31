<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Event;
use App\Models\Gallery;
use App\Models\Slider;
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
        $this->call(SettingSeeder::class);
//        Category::factory(10)->create();
//        $tag = Tag::factory()->count(20)->create();
//        Article::factory()->count(20)->hasAttached(
//            $tag, ['tag_id' => $tag->random()->id]
//        )->create();
//        Comment::factory(10)->create();
//        Event::factory(9)->create();
//        Brand::factory(10)->create();
//        Gallery::factory(3)->create();
//        Slider::factory(3)->create();
        $this->call(PageSeeder::class);
        $this->call(MenuSeeder::class);
//        Article::factory(10)->create();
    }
}
