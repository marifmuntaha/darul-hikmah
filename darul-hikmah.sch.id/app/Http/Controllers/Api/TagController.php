<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTagRequest;
use App\Http\Resources\TagResource;
use App\Models\Tag;
use Exception;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        try {
            $tags = Tag::all();
            return response([
                'result' => TagResource::collection($tags),
            ]);
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage(),
            ], 400);
        }
    }

    public function store(StoreTagRequest $request)
    {
        try {
            return ($tag = Tag::create($request->all()))
                ? response([
                    'message' => 'Tagar berhasil ditambahkan',
                    'result' => new TagResource($tag)
                ]) : throw new Exception('Tagar gagal ditambahkan');
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage(),
            ], 400);
        }
    }

    public function update(Request $request, Tag $tag)
    {
        try {
            return $tag->update(array_filter($request->all()))
                ? response([
                    'message' => 'Tagar berhasil diperbarui.',
                    'result' => new TagResource($tag)
                ]) : throw new Exception('Tagar gagal diperbarui');
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage(),
            ], 400);
        }
    }

    public function destroy(Tag $tag)
    {
        try {
            return $tag->delete()
                ? response([
                    'message' => 'Tagar berhasil dihapus',
                    'result' => new TagResource($tag)
                ]) : throw new Exception('Tagar gagal dihapus');
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage(),
            ], 400);
        }
    }
}
