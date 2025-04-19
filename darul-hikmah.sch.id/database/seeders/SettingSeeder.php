<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $setting = [
            ['appname', 'PORTAL YAYASAN DARUL HIKMAH MENGANTI'],
            ['favicon', '/storage/images/favicon.png'],
            ['phone', '082229366506'],
            ['email', 'info@darul-hikmah.sch.id'],
            ['whatsapp', '082229366506'],
            ['instagram', 'yayasandarulhikmahmenganti'],
            ['youtube', 'Gallery Darul Hikmah'],
            ['logo', 'storage/images/logo.png'],
            ['footer-bg', 'storage/images/bg-4.png'],
            ['footer-about', 'Yayasan Darul Hikmah Menganti secara aktif turut serta dalam menghasilkan generasi yang cerdas, mandiri dan berakhlak mulia.'],
        ];
        for($i = 0; $i < count($setting); $i++){
            DB::table('settings')->insert([
                'name' => $setting[$i][0],
                'content' => $setting[$i][1],
            ]);
        }
    }
}
