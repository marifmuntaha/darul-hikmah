<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
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
            'image' => $this['image'],
            'placeholder' => $this['placeholder'],
            'user_id' => $this['user_id'],
            'category_id' => $this['category_id'],
            'title' => $this['title'],
            'slug' => $this['slug'],
            'content' => $this['content'],
            'comment' => $this['comment'],
            'status' => $this['status'],
            'user' => $this->user,
        ];

        if ($request->has('with')) {
            $with = explode(',', $request->with);
            if (in_array('category', $with)) {
                $resource['category'] = $this->category;
            }
            if (in_array('tags', $with)) {
                $resource['tags'] = $this->tags;
            }
        }

        return $resource;
    }
}
