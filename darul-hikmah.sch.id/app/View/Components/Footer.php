<?php

namespace App\View\Components;

use App\Models\Gallery;
use App\Models\Setting;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Footer extends Component
{
    public string $background;
    public string $about;
    public string $email;
    public string $phone;
    public object|null $gallery;

    public function __construct()
    {
        $this->background = Setting::where('name', 'footer-bg')->value('content') ?: 'assets/images/bg-4.jpg';
        $this->about = Setting::where('name', 'footer-about')->value('content') ?: '';
        $this->email = Setting::where('name', 'email')->value('content') ?: '';
        $this->phone = Setting::where('name', 'phone')->value('content') ?: '';
        $this->gallery = Gallery::latest()?->first('images');

    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.footer');
    }
}
