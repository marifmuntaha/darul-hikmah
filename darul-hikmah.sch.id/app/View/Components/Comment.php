<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Comment extends Component
{
    public object $comments;
    public object $children;

    public function __construct($comments)
    {
        $this->comments = $comments->filter(function ($comment) {
            return $comment->parent == 0;
        });

        $this->children = $comments->filter(function ($comment) {
            return $comment->parent != 0;
        });
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.comment');

    }
}
