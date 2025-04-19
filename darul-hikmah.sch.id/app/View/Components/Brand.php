<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;
use App\Models\Brand as BrandModel;

class Brand extends Component
{
    public object $brands;

    public function __construct()
    {
        $this->brands = BrandModel::all();
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.brand');
    }
}
