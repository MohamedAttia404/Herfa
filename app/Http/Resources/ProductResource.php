<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);

        $image='';
        if( strpos( $this->image, 'images' ) !== false) {
            $image="http://".$_SERVER['HTTP_HOST']."/storage/".$this->image;
        }
        else{
            $image=$this->image;
        }

        return[
            "id"=>$this->id,
            "name"=>$this->name,
            "description"=>$this->description,
            "image"=>$image,
            "price"=>$this->price,
            "quantity"=>$this->quantity,
            "is_new"=>$this->is_new,
            // "user_id"=>$this->user_id,
            // "category_id"=> $this->category_id
        ];
    }
}
