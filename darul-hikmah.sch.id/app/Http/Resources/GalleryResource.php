<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GalleryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $resource = [
            'id' => $this['id'],
            'title' => $this['title'],
            'content' => $this['content'],
            'images' => $this['images'],
        ];
        if ($request->has('type')) {
            if ($request->type == 'select') {
                $resource = [
                    'value' => $this['id'],
                    'label' => $this['title'],
                    'images' => $this['images'],
                ];
            }
        }
        return $resource;
    }
}
