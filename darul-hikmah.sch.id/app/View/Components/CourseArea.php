<?php

namespace App\View\Components;

use App\Models\Page;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class CourseArea extends Component
{
    public object $page;
    public object $carousel;

    public function __construct()
    {
        $page= Page::whereName('home_widget_course')->first('content');
        $this->page = collect(json_decode($page->content, true));
        $this->carousel = collect($this->page['content']);
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.course-area');
    }
}
