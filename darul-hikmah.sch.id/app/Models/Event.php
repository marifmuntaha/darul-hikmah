<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Storage;

class Event extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'image', 'title', 'content', 'location', 'start', 'end', 'gallery_id', 'placeholder'];

    public function gallery(): hasOne
    {
        return $this->hasOne(Gallery::class, 'id', 'gallery_id');
    }

    public function placeholder(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Storage::disk('public')->url($value),
        );
    }

    public function image(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Storage::disk('public')->url($value),
        );
    }

    public function startDay(): String
    {
        return Carbon::parse($this->start)->format('jS');
    }

    public function startMonth(): String
    {
        return Carbon::parse($this->start)->format('M');
    }

    public function startClock(): String
    {
        return Carbon::parse($this->start)->format('H:m a');
    }
}
