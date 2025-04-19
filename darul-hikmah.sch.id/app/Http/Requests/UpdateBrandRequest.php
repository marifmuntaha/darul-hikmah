<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBrandRequest extends FormRequest
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
        $rules = [
            'link' => 'required|string',
            'name' => 'required|string',
            'description' => 'nullable|string',
        ];
        is_string($this->image) ? $rules['image'] ='required|string' : $rules['image'] = 'nullable|image|mimes:jpeg,png,jpg|max:1024';
        return $rules;
    }

    public function attributes(): array
    {
        return [
            'link' => 'Tautan',
            'name' => 'Nama Brand',
            'description' => 'Diskripsi',
            'image' => 'Logo',
        ];
    }
}
