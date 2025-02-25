<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;
use App\Models\Teacher as TeacherModel;

class Teacher extends Component
{
    public object $teachers;

    public function __construct()
    {
        $this->teachers = TeacherModel::limit(5)->get();
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.teacher');
    }
}
