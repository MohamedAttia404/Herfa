<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
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
        'title' => 'required|string|max:255|min:3',
        'description' => 'required|string|max:255|min:3',
        'address' => 'required|string|max:255|min:3',
        'event_time'=> 'required|data',
        'duration'=> 'required|string',   
        'num_attendees'=> 'required|numeric',
        ];
    }
}
