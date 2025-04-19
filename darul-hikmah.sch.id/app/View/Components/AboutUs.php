<?php

namespace App\View\Components;

use App\Models\Page;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class AboutUs extends Component
{
    public array|null $page;

    public function __construct()
    {
        $page= Page::whereName('home_widget_about')->first('content');
        $this->page = json_decode($page->content, true);
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.about-us');
    }
}
