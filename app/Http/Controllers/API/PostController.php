<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Post;
use App\User;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    //|TODO                                         |
    //| #make requests for update and store         |
    //| # see collection for show                   |
    //| # add image in update and destroy           |
    //| # auth                                      |
    

    //Done
    //   # full crud
    //| # ->sortByDesc('created_at') index response | 
//---------------------------------------------------


    public function index(){
        return PostResource::collection(Post::orderBy('created_at','desc')->with('user')->paginate(4));
    }

    public function show($id){
        return new PostResource(Post::find($id));
    }

    //only authenticated user
    public function store(Request $request){
        if ($request->profile){
            $request['image']=Storage::disk('public')->put('img',$request->profile);
        }
        $user=Auth::user();
        $request['user_id'] =$user->id;
        $post=Post::create($request->all());
        return response()->json($post,201);
    }

    //only authenticated user
    public function update(Request $request, $id){
        // $user=Auth::user();
        // $request['user_id'] =$user->id; 
        $updated_post=Post::find($id);
        $updated_post->update($request->all());
        $updated_post->fresh(); #fresh return new instance of the model
        return response()->json($updated_post, 200);
    }

    //only authenticated user
    public function destroy(Request $request, $id){
       if (Auth::user()){
        $deleted_post=Post::find($id);
        $del=$deleted_post->delete();
        if ($del==1){
            $success["message"] = "Post Deleted Successfully";
            return response()->json($success);
        }
        // }else{
        //     $error["message"] =" Cannot Delete This Post";
        //     return response()->json($error);
        // }

       }else{
        $error["message"] =" unautheried";
        return response()->json($error); 
       }
        
    }






}
