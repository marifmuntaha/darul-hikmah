<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Exception;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        try {
            $categories = Category::all();
            return response([
                'result' => CategoryResource::collection($categories),
            ]);
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage(),
            ], 400);
        }
    }

    public function store(StoreCategoryRequest $request)
    {
        try {
            return ($category = Category::create($request->all()))
                ? response([
                    'message' => 'Kategori berhasil ditambahkan',
                    'result' => $category,
                ]): throw new Exception('Kategori gagal ditambahkan');
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage(),
            ], 400);
        }
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        try {
            return $category->update(array_filter($request->all()))
                ? response([
                    'message' => 'Kategori berhasil diubah',
                    'result' => $category,
                ]) : throw new Exception('Kategori gagal diubah');
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage(),
            ], 400);
        }
    }

    public function destroy(Category $category)
    {
        try {
            return $category->delete()
                ? response([
                    'message' => 'Kategori berhasil dihapus',
                    'result' => $category,
                ]) : throw new Exception('Kategori gagal dihapus');
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage(),
            ], 400);
        }
    }
}
