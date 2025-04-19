<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreSliderRequest extends FormRequest
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
            'background' => 'required|image|mimes:jpeg,png,jpg|max:1024',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:1024',
            'title' => 'required|string',
            'description' => 'required|string',
            'button' => 'nullable|string',
            'status' => 'required|string',
        ];
    }

    public function attributes(): array
    {
        return [
            'background' => 'Gambar Latar Belakang',
            'image' => 'Gambar',
            'title' => 'Judul',
            'description' => 'Diskripsi',
            'button' => 'Tombol',
            'status' => 'Status',
        ];
    }
}
