<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
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
            'image' => 'nullable',
            'title' => 'required|string',
            'content' => 'required|string',
            'location' => 'required|string',
            'start' => 'required|date',
            'end' => 'required|date',
            'gallery' => 'integer|nullable',
            'placeholder' => 'nullable',
        ];
    }

    public function attributes(): array
    {
        return [
            'image' => 'Gambar',
            'title' => 'Judul',
            'content' => 'Konten',
            'location' => 'Lokasi',
            'start' => 'Tanggal Mulai',
            'end' => 'Tanggal Selesai',
            'gallery' => 'Galeri',
            'placeholder' => 'Gambar Mini',
        ];
    }
}
