<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SettingController extends Controller
{
    public function index()
    {
        try {
            $settings = Setting::all();
            return response([
                'result' => $settings,
            ]);
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function update(Request $request, Setting $setting)
    {
        try {
            $data = $request->all();
            if ($request->hasFile('content')){
                $request->validate([
                    'content' => 'mimes:jpeg,jpg,png'
                ]);
                $file = $request->file('content');
                $fileName = Str::random(20) . '.' . $file->getClientOriginalExtension();
                $store = Storage::disk('public')->putFileAs('images', $file, $fileName);
                $pathFile = Storage::disk('public')->url($store);
                $data['content'] = $pathFile;
            }
            if ($setting->update(array_filter($data))) {
                return response([
                    'message' => 'Pengaturan berhasil disimpan.',
                    'result' => $setting
                ]);
            } else {
                throw new Exception('Pengaturan gagal disimpan.');
            }
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage(),
            ], 400);
        }
    }
}
