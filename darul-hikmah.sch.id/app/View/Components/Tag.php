<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;
use App\Models\Tag as ModelTag;

class Tag extends Component
{
    public object $tags;

    public function __construct()
    {
        $this->tags = ModelTag::limit(10)->get();
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.tag');
    }
}
