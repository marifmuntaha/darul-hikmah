<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Article extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'image', 'placeholder', 'user_id', 'category_id', 'title', 'slug', 'content', 'comment', 'status'];

    protected function slug(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => Str::replace('.', '', preg_replace('/[^A-Za-z0-9\-]/', '', Str::replace(' ', '-', Str::lower($value)))),
        );
    }

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? Storage::disk('public')->url($value) : null,
        );
    }

    protected function placeholder(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? Storage::disk('public')->url($value) : null,
        );
    }

    public function category(): HasOne
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'article_tags', 'article_id', 'tag_id');
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function comments(): BelongsToMany
    {
        return $this->belongsToMany(Comment::class, 'article_comments', 'article_id', 'comment_id');
    }

    public function createdAt(): string
    {
        return Carbon::parse($this->created_at)->translatedFormat('d M Y');
    }
}
