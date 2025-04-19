<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;
use App\Models\Slider as SliderModel;

class Slider extends Component
{
    public object $sliders;

    public function __construct()
    {
        $this->sliders = SliderModel::whereStatus('1')->get();
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.slider');
    }
}
