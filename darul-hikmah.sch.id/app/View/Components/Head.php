<?php

namespace App\View\Components;

use App\Models\Setting;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Head extends Component
{
    public string $favicon;
    public array $meta;
    public string $title;

    public function __construct($meta = [], $page = '')
    {
        $appname = Setting::where('name', 'appname')->value('content');
        $this->favicon = asset(Setting::where('name', 'favicon')->value('content'));
        $this->meta = $meta;
        $this->title = $page. ' - ' . $appname;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.head');
    }
}
