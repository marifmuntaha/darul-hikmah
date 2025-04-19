<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Brand extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'link', 'name', 'description', 'image'];

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Storage::disk('public')->url($value),
        );
    }
}
