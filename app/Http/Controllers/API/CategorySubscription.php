<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Category;
use Illuminate\Support\Facades\Auth;

class CategorySubscription extends Controller
{
    //
    public function store($id, Request $request)
    {
        # code...
        $category=new Category();
        $user=Auth::user();
        $user_id=$user->id;
        // $cat=Category::find($request['category_id']);
        $cat=Category::find($id);
        if (!$cat==null){
            // $category->subscribe($request['category_id'],$user_id );
            $category->subscribe($id,$user_id );

            return response()->json(['msg'=>'interest was created successfully']);
        }else{
            return response()->json(['msg'=>'cannot create interest']);
        }  
    }

    public function destroy($id, Request $request)
    {
        # code...
        $category=new Category();
        // $user=Auth::user();
        // $user_id=$user->id;
        // $cat=Category::find($id);
        // if (!$cat==null){
            // $category->subscribe($request['category_id'],$user_id );
            $category->unsubscribe($id);

            return response()->json(['msg'=>'interest was deleted successfully']);
        // }else{
        //     return response()->json(['msg'=>'error']);
        // } 
    }
}
