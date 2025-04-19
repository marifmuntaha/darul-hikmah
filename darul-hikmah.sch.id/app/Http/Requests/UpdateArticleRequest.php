<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function rules(): array
    {
        $rules = [
            'user_id' => 'required|integer|exists:users,id',
            'category_id' => 'required|integer|exists:categories,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'content' => 'required|string',
            'comment' => 'required|string',
            'status' => 'required|string',
        ];
        $rules['image'] = is_string($this->image) ? 'nullable' : 'nullable|image|mimes:jpeg,png,jpg|max:1024';
        $rules['placeholder'] = is_string($this->placeholder) ? 'nullable' : 'nullable|image|mimes:jpeg,png,jpg|max:1024';
        return $rules;
    }

    public function attributes(): array
    {
        return [
            'image' => 'Gambar',
            'placeholder' => 'Gambar Mini',
            'user_id' => 'ID Pengguna',
            'category_id' => 'Kategori',
            'title' => 'Judul',
            'slug' => 'slug',
            'content' => 'Konten',
            'comment' => 'Komentar',
            'status' => 'Status',
        ];
    }
}
