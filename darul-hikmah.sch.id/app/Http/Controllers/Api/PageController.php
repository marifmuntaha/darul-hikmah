<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PageController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('name')) {
                $pages = Page::whereName($request->name)->first();
            } else {
                $pages = Page::all();
            }
            return response([
                'result' => $pages
            ]);
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function update(Request $request, Page $page)
    {
        try {
            return $page->update(array_filter($request->all()))
                ? response([
                    'message' => 'Pengaturan Halaman berhasil diperbarui.',
                    'result' => $page
                ]) : throw new Exception('Pengaturan Halaman gagal diperbarui.');
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function upload(Request $request)
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg|max:1024'
            ]);
            $file = $request->file('image');
            $fileName = Str::random(20) . '.' . $file->getClientOriginalExtension();
            $filePath = Storage::disk('public')->putFileAs('images/page', $file, $fileName);
            $fileUrl = Storage::disk('public')->url($filePath);
            return response([
                'message' => 'Gambar berhasil di unggah',
                'result' => $fileUrl
            ]);
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage(),
            ], 400);
        }
    }
}
