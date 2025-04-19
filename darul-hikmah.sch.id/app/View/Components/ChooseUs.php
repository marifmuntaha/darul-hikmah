<?php

namespace App\View\Components;

use App\Models\Page;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class ChooseUs extends Component
{
    public object $widget;
    public array $color;

    public function __construct()
    {
        $page = Page::whereName('home_widget_feature')->first('content');
        $this->widget = collect(json_decode($page->content, true));
        $this->color = ['choose-bg-light-blue', 'choose-bg-yellow', 'choose-bg-blue', 'choose-bg-green'];
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.choose-us');
    }
}
