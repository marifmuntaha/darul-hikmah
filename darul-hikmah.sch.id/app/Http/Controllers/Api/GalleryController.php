<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GalleryResource;
use App\Models\Gallery;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        try {
            $galleries = new Gallery();
            if ($request->has('dashboard')) {
                return response([
                    'result' => $this->dashboard()
                ]);
            }
            return response([
                'result' => GalleryResource::collection($galleries->get()),
            ]);
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage(),
            ], 400);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'images' => 'required|array',
            ]);
            $data = $request->all();
            if ($request->hasFile('images')) {
                $files = $request->file('images');
                $data['images'] = [];
                foreach ($files as $file) {
                    $fileName = Str::random(20) . '.' . $file->getClientOriginalExtension();
                    $filePath = Storage::disk('public')->putFileAs('images/gallery', $file, $fileName);
                    $data['images'][] = $filePath;
                }
            }
            return ($gallery = Gallery::create($data))
                ? response([
                    'message' => 'Galleri berhasil ditambahkan.',
                    'result' => $gallery,
                ]) : throw new Exception("Galeri gagal ditambahkan.");
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage(),
            ], 400);
        }
    }

    public function update(Request $request, Gallery $gallery)
    {
        try {
            $data = $request->all();
            $oldImages = $gallery->images;
            if ($request->hasFile('images')) {
                $files = $request->file('images');
                $data['images'] = [];
                foreach ($files as $file) {
                    $fileName = Str::random(16) . '.' . $file->getClientOriginalExtension();
                    $filePath = Storage::disk('public')->putFileAs('images/gallery', $file, $fileName);
                    $data['images'][] = $filePath;
                }
            }
            if ($gallery->update(array_filter($data))) {
                isset($data['images']) && $oldImages->map(function ($item) {
                    Storage::disk('public')->delete($item);
                });
                return response([
                    'message' => 'Galleri berhasil diperbarui.',
                    'result' => $gallery,
                ]);
            } else {
                throw new Exception("Galleri gagal diperbarui.");
            }
        } catch (Exception $exception) {
            if (isset($data['count']) && count($data['images']) > 0) {
                for ($i = 0 ; $i < count($data['image']) ; $i++) {
                    Storage::disk('public')->delete($data['images'][$i]);
                }
            }
            return response([
                'message' => $exception->getMessage(),
            ], 400);
        }
    }

    public function destroy(Gallery $gallery)
    {
        try {
            if ($gallery->delete()) {
                $gallery->images->map(function ($item) {
                    Storage::disk('public')->delete($item);
                });
                return response([
                    'message' => 'Galeri berhasil dihapus.',
                    'result' => $gallery,
                ]);
            } else {
                throw new Exception("Galeri gagal dihapus.");
            }
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage(),
            ], 400);
        }
    }

    protected function dashboard(): array
    {
        $galleries = new Gallery();
        $periods = now()->subMonths(10)->monthsUntil(now());
        $months = collect([]);
        $gallery = collect([]);
        foreach ($periods as $item) {
            $months[] = collect([
                'month' => $item->shortMonthName,
                'year' => $item->year,
            ]);
            $gallery[] = $galleries->whereMonth('created_at', $item->month)
                ->whereYear('created_at', $item->year)->count();
        }
        return [
            'months' => $months->map(function ($item) {
                return $item['month'].' '. $item['year'];
            }),
            'events' => $gallery,
            'total' => $galleries->get()->count()
        ];
    }
}
