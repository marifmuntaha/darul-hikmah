<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Models\Brand;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    public function index()
    {
        try {
            $brands = new Brand();
            return response([
                'result' => $brands->get(),
            ]);
        } catch (Exception $e) {
            return response([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function store(StoreBrandRequest $request)
    {
        try {
            $data = $request->all();
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $nameImage = Str::random(15) . '.' . $image->getClientOriginalExtension();
                $pathImage = Storage::disk('public')->putFileAs('/images/brand', $image, $nameImage);
                $data['image'] = $pathImage;
            }
            return ($brand = Brand::create($data))
                ? response([
                    'result' => $brand,
                    'message' => 'Brand berhasil ditambahkan.',
                ], 201) : throw new Exception('Brand gagal ditambahkan.');
        } catch (Exception $e) {
            isset($pathImage) && Storage::disk('public')->delete($pathImage);
            return response([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        try {
            $data = $request->all();
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $nameImage = Str::random(15) . '.' . $image->getClientOriginalExtension();
                $pathImage = Storage::disk('public')->putFileAs('/images/brand', $image, $nameImage);
                $data['image'] = $pathImage;
            } else {
                $data['image'] = '';
            }
            return $brand->update(array_filter($data))
                ? response([
                    'result' => $brand,
                    'message' => 'Brand berhasil diupdate.',
                ]) : throw new Exception('Brand gagal diupdate.');
        } catch (Exception $e) {
            isset($pathImage) && Storage::disk('public')->delete($pathImage);
            return response([
                'error' => $e->getMessage(),
            ], 400);
        }
    }
    public function destroy(Brand $brand)
    {
        try {
            if ($brand->delete()) {
                Storage::disk('public')->delete($brand->image);
                return response([
                    'result' => $brand,
                    'message' => 'Brand berhasil dihapus.',
                ]);
            } else {
                throw new Exception('Brand gagal dihapus.');
            }
        } catch (Exception $e) {
            return response([
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
