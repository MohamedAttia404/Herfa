<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Post;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Storage;

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
        // return Post::find($id);
    }

    public function store(Request $request){
        if ($request->profile){
            $request['image']=Storage::disk('public')->put('img',$request->profile);
        }
        $request['user_id'] =1; //untill i have a user
        $post=Post::create($request->all());
        return response()->json($post,201);
    }

    public function update(Request $request, $id){
        $request['user_id'] =1;//untill i have a user
        $updated_post=Post::find($id);
        $updated_post->update($request->all());
        $updated_post->fresh(); #fresh return new instance of the model
        return response()->json($updated_post, 200);
    }

    public function destroy(Request $request, $id){
        $request['user_id'] =1;
        $deleted_post=Post::find($id);
        $del=$deleted_post->delete();
        if ($del==1){
            // $success["message"] = "Post Deleted Successfully";
            return response()->json($deleted_post);
        }else{
            return "error";
        }
        // $success["message"] = "Post Deleted Successfully";
        // return $success["message"];
    }






}
