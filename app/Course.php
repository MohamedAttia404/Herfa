<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function category()
    {
        return $this->belongsTo('App\Category');
    }
    
    //Place polymorphic 
    public function place()
    {
        return $this->morphOne('App\Place', 'placeable');
    }
}
