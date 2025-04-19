<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use function PHPUnit\Framework\isString;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        try {
            $articles = new Article();
            if ($request->has('month')) {
                $articles = $articles->whereMonth('created_at', $request->month);
            }
            if ($request->has('year')) {
                $articles = $articles->whereYear('created_at', $request->year);
            }
            if ($request->has('dashboard')) {
                return response([
                    'result' => $this->dashboard()
                ]);
            }
            $articles->orderBy('created_at', 'desc');
            return response()->json([
                'result' => ArticleResource::collection($articles->get()),
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'result' => null
            ], 400);
        }
    }

    public function store(StoreArticleRequest $request)
    {
        try {
            $data = $request->all();
            $image = $request->file('image');
            $nameImage = Str::random(16) . '.' . $image->getClientOriginalExtension();
            $pathImage = Storage::disk('public')->putFileAs('/images/article', $image, $nameImage);
            $data['image'] = $pathImage;

            if ($request->hasFile('placeholder')) {
                $placeholder = $request->file('placeholder');
                $namePlaceholder = Str::random(16) . '.' . $placeholder->getClientOriginalExtension();
                $pathPlaceholder = Storage::disk('public')->putFileAs('images/article', $placeholder, $namePlaceholder);
                $data['placeholder'] = $pathPlaceholder;
            }

            $article = Article::create($data);
            $tags = json_decode($data['tags']);
            $tag = [];
            for ($i = 0; $i < count($tags); $i++) {
                $tag[] = $tags[$i]->value;
            }
            $article->tags()->attach($tag);
            return response()->json([
                'message' => 'Artikel berhasil dibuat',
                'result' => $article
            ], 201);

        } catch (Exception $exception){
            return response([
                'message' => $exception->getMessage(),
                'result' => null
            ], 400);
        }
    }

    public function show(Article $article)
    {
        return response([
            'result' => $article->with('tags')->find($article->id),
        ]);
    }

    public function update(UpdateArticleRequest $request, Article $article)
    {
        try {
            $data = $request->all();
            if ($request->hasFile('image') && !is_string($request->image)) {
                $image = $request->file('image');
                $nameImage = Str::random(16) . '.' . $image->getClientOriginalExtension();
                $pathImage = Storage::disk('public')->putFileAs('/images/article', $image, $nameImage);
                $data['image'] = $pathImage;
            } else {
                $data['image'] = '';
            }
            if ($request->hasFile('placeholder') && !is_string($request->placeholder)) {
                $placeholder = $request->file('placeholder');
                $namePlaceholder = Str::random(16) . '.' . $placeholder->getClientOriginalExtension();
                $pathPlaceholder = Storage::disk('public')->putFileAs('images/article', $placeholder, $namePlaceholder);
                $data['placeholder'] = $pathPlaceholder;
            } else {
                $data['placeholder'] = '';
            }
            return $article->update(array_filter($data)) ?
                response([
                    'message' => 'Artikel berhasil diperbarui.',
                    'result' => $article
                ]) : throw new Exception('Terjadi kesalahan server.');
        }catch (Exception $exception){
            return response([
                'message' => $exception->getMessage(),
                'result' => null
            ], 400);
        }
    }

    public function destroy(Article $article)
    {
        try {
            $article->delete();
            Storage::disk('public')->delete($article->image);
            Storage::disk('public')->delete($article->placeholder);
            return response([
                'message' => 'Artikel berhasil dihapus.',
                'result' => $article
            ]);
        } catch (Exception $exception){
            return response([
                'message' => $exception->getMessage(),
                'result' => null
            ], 400);
        }
    }

    protected function dashboard(): array
    {
        $articles = new Article();
        $periods = now()->subMonths(10)->monthsUntil(now());
        $months = collect([]);
        $article = collect([]);
        foreach ($periods as $item) {
            $months[] = collect([
                'month' => $item->shortMonthName,
                'year' => $item->year,
            ]);
            $article[] = $articles->whereMonth('created_at', $item->month)
                ->whereYear('created_at', $item->year)->count();
        }
        return [
            'months' => $months->map(function ($item) {
                return $item['month'].' '. $item['year'];
            }),
            'article' => $article,
            'total' => $articles->get()->count()
        ];
    }
}
