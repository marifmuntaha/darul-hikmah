<?php

namespace App\View\Components;

use App\Models\Page;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Division extends Component
{
    public object $page;
    public object $widget;

    public function __construct()
    {
        $page= Page::whereName('home_widget_division')->first('content');
        $this->page = collect(json_decode($page->content, true));
        $this->widget = collect($this->page['content']);
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.division');
    }
}
