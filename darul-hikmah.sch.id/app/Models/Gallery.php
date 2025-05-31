<?php

namespace App\Models;

use Database\Factories\GalleryFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Gallery extends Model
{
    /** @use HasFactory<GalleryFactory> */
    use HasFactory;

    protected $fillable = ['id', 'title', 'content', 'images'];

    protected function images(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => collect(json_decode($value, true))->map(function ($item) {
                return Storage::disk('public')->url($item);
            }),
            set: fn ($value) => json_encode($value, true),
        );
    }
}
