<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Category;
use App\Interest;
use Illuminate\Support\Facades\Auth;

class CategorySubscription extends Controller
{
    //

    public function index( $user_id){
        // return response()->json($user_id);

        $interest= Interest::where('user_id', $user_id)->get();
        return response()->json($interest);

    }


    public function store($id, Request $request)
    {
        # code...
        // return response()->json($request->id);
        $category=new Category();
        $user=Auth::user();
        $user_id=$user->id;
        // $cat=Category::find($request['category_id']);
        $cat=Category::find($id);
        // return response()->json($cat);
        if (!$cat==null){
            // $category->subscribe($request['category_id'],$user_id );
            $sub=$category->subscribe($id,$user_id );
            return response()->json($sub);
            // return response()->json(['msg'=>'interest was created successfully']);
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
            $unsub=$category->unsubscribe($id);
            // ['msg'=>'interest was deleted successfully']
            return response()->json($unsub);
        // }else{
        //     return response()->json(['msg'=>'error']);
        // } 
    }
}
