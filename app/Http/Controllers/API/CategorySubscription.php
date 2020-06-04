<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Category;
use Illuminate\Support\Facades\Auth;

class CategorySubscription extends Controller
{
    //
    public function store(Category $category, Request $request)
    {
        # code...
        
        $user=Auth::user();
        $user_id=$user->id;
        $cat=Category::find($request['category_id']);
        if (!$cat==null){
            $category->subscribe($request['category_id'],$user_id );
            return response()->json(['msg'=>'interest was created successfully']);
        }else{
            return response()->json(['msg'=>'error']);
        }  
    }
}
