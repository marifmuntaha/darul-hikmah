<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:1024',
            'placeholder' => 'nullable|image|mimes:jpeg,png,jpg|max:1024',
            'user_id' => 'required|integer|exists:users,id',
            'category_id' => 'required|integer|exists:categories,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'content' => 'required|string',
            'comment' => 'required|string',
            'status' => 'required|string',
        ];
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
