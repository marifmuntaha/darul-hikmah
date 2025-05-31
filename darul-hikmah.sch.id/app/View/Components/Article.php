<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;
use App\Models\Article as ArticleModel;

class Article extends Component
{
    public object $articles;
    public bool $isRecent;
    public bool $isSidebar;

    public function __construct($isRecent = false, $isSidebar = false, $category = null)
    {
        $this->isRecent = $isRecent;
        $this->isSidebar = $isSidebar;
        if ($isRecent) {
            $this->articles = ArticleModel::with('category')
                ->where('category_id', $category)
                ->limit(3)
                ->orderBy('created_at', 'DESC')
                ->get();
        }
        else {
            $this->articles = ArticleModel::with('category')
                ->where('status', '1')
                ->limit(4)
                ->orderBy('created_at', 'DESC')
                ->get();
        }
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.article');
    }
}
