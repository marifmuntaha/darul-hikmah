<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateMenuRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'parent' => 'nullable|int',
            'name' => 'required|string',
            'link' => 'required|string',
            'description' => 'nullable|string',
            'children' => 'nullable|boolean',
        ];
    }

    public function attributes(): array
    {
        return [
            'parent' => 'ID Parent',
            'name' => 'Nama Menu',
            'link' => 'Link',
            'description' => 'Diskripsi',
            'child' => 'Sub Menu',
        ];
    }
}
