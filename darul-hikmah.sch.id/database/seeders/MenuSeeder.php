<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menus = collect([
            (object)['parent' => 0, 'name' => 'BERANDA', 'link' => 'http://localhost:8000', 'child' => false],
            (object)['parent' => 0, 'name' => 'PROFIL', 'link' => '#', 'child' => true],
            (object)['parent' => 2, 'name' => 'SELAYANG PANDANG', 'link' => '#', 'child' => false],
            (object)['parent' => 2, 'name' => 'VISI & MISI', 'link' => '#', 'child' => false],
            (object)['parent' => 2, 'name' => 'STRUKTUR ORGANISASI', 'link' => '#', 'child' => false],
            (object)['parent' => 0, 'name' => 'LEMBAGA', 'link' => '#', 'child' => true],
            (object)['parent' => 6, 'name' => 'RAUDHATUL ATFAL', 'link' => '#', 'child' => false],
            (object)['parent' => 6, 'name' => 'MADRASAH IBTIDAIYAH', 'link' => '#', 'child' => false],
            (object)['parent' => 6, 'name' => 'MADRASAH TSANAWIYAH', 'link' => '#', 'child' => false],
            (object)['parent' => 6, 'name' => 'MADRASAH ALIYAH', 'link' => '#', 'child' => false],
            (object)['parent' => 0, 'name' => 'KEGIATAN', 'link' => 'http://localhost:8000/kegiatan', 'child' => false],
            (object)['parent' => 0, 'name' => 'BERITA', 'link' => 'http://localhost:8000/berita', 'child' => false],
            (object)['parent' => 0, 'name' => 'TENTANG', 'link' => 'http://localhost:8000/berita', 'child' => false],
        ]);

        $menus->map(function ($menu) {
            DB::table('menus')->insert([
                'parent' => $menu->parent,
                'name' => $menu->name,
                'link' => $menu->link,
                'child' => $menu->child,
            ]);
        });
    }
}
