<?php

namespace App\View\Components;

use App\Models\Setting;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class header extends Component
{
    public string $phone;
    public string $email;
    public string $whatsapp;
    public string $instagram;
    public string $youtube;
    public string $logo;

    public function __construct()
    {
        $this->phone        = Setting::where('name', 'phone')->value('content');
        $this->email        = Setting::where('name', 'email')->value('content');
        $this->whatsapp     = Setting::where('name', 'whatsapp')->value('content');
        $this->instagram    = Setting::where('name', 'instagram')->value('content');
        $this->youtube      = Setting::where('name', 'youtube')->value('content');
        $this->logo         = asset(Setting::where('name', 'logo')->value('content'));
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.header');
    }
}
