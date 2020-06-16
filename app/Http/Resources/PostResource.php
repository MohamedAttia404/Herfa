<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CommentResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            // 'user_id'=>$this->user_id,
            'title'=>$this->title,
            'content'=>$this->content,
            'created_at'=>$this->created_at,
            'image'=>$this->image,
            'comments'=>CommentResource::collection($this->comments),
            'user_info'=> new UserResource($this->user)
        ];
    }
}
