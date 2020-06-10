<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Place;
use  App\Http\Controllers\API\BaseController ;
use App\Http\Resources\PlaceResource;

class PlaceController extends BaseController
{
    //
    public function index() {

      return PlaceResource::collection(
          Place::all()
       // User::paginate(5)
       );
  }

}
