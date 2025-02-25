<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;
use App\Models\Category as CategoryModel;

class Category extends Component
{
    public object $categories;

    public function __construct()
    {
        $this->categories = CategoryModel::with('article')->limit(7)->get();
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.category');
    }
}
