<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = collect([
            ['name' => 'home_widget_feature', 'content' => '[]]'],
            ['name' => 'home_widget_about', 'content' =>  '[]]'],
            ['name' => 'home_widget_course', 'content' => '[]]'],
            ['name' => 'home_widget_admission', 'content' => '[]]'],
            ['name' => 'home_widget_division', 'content' => '[]]'],
            ['name' => 'home_widget_teacher', 'content' => '[]]'],
        ]);

        $pages->map(function ($page) {
            DB::table('pages')->insert([
                'name' => $page['name'],
                'content' => $page['content'],
            ]);
        });
    }
}
