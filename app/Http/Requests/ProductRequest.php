<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
        'name' => 'required|string|max:255|min:3',
        'description'=> 'required|string|max:255|min:3',
        'image'=>'image|mimes:jpeg,bmp,png',
        'price'=> 'required|numeric',
        'quantity'=> 'required|numeric',   
        'is_new'=> 'required|numeric',
        ];
    }
}
