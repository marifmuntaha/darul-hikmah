<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;
use App\Models\Article as ArticleModel;

class Article extends Component
{
    public object $articles;

    public function __construct()
    {
        $this->articles = ArticleModel::with('category')->where('status', '1')->limit(3)
            ->orderBy('created_at', 'DESC')->get();
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.article');
    }
}
