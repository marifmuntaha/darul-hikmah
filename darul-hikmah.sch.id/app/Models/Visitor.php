<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    protected $fillable = ['id', 'ip', 'visited_at'];

    public function expired(): bool
    {
        return Carbon::parse($this->visited_at)->addMinutes(1) < Carbon::now();
    }
}
