<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public array $data;

    public function index()
    {
        $this->data['meta'] = [
            ['name' => 'title', 'content' => 'Semua Artikel Yayasan Darul Hikmah Menganti'],
            ['name' => 'desc', 'content' => 'Semua Artikel Yayasan Darul Hikmah Menganti Kedung Jepara'],
            ['name' => 'keyword', 'content' => 'portal, portal resmi, portal yayasan, portal yayasan darul hikmah, portal yayasan darul hikmah menganti, artikel, berita, acara, pengumuman']
        ];
        $this->data['articles'] = Article::with('category')->orderBy('created_at', 'DESC')->paginate(9);
        return view('article', $this->data);
    }

    public function show(Article $article)
    {
        $tags = $article->tags()->get()->collect();
        $tag = '';
        $tags->each(function ($item) use (&$tag) {
            $tag .= $item->name . ',  ';
        });

        $this->data['meta'] = [
            ['name' => 'title', 'content' => $article->title],
            ['name' => 'desc', 'content' => 'Artikel Yayasan Darul Hikmah Menganti Kedung Jepara'],
            ['name' => 'keyword', 'content' => rtrim($tag, ', ')],
        ];
        $this->data['post'] = $article;
        return view('article-show', $this->data);
    }
}
