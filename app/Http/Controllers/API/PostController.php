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
    //| #make requests fro update and store         |
    //| # see collection for show                   |
    //| # add image in update and destroy           |
    //| # auth                                      |
//---------------------------------------------------


    public function index(){
        // return PostResource::collection(Post::with('user')->paginate(2));
        return Post::all();
    }

    public function show($id){
        // return PostResource::collection(Post::find($id));
        return Post::find($id);
    }

    public function store(Request $request){
        $request['image']=Storage::disk('public')->put('im',$request->profile);
        $request['user_id'] =1; //untill i have a user
        $post=Post::create($request->all());
        return response()->json($post, 201);
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
        $deleted_post->delete();
        $success["message"] = "Post Deleted Successfully";
        return $success["message"];
    }






}
