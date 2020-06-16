<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Post;
use App\User;
use App\Comment;

class CommentController extends Controller
{
    //
    public function store(StoreCommentRequest $request, $post){

       
        // return response()->json($request->all());
        
        $post= Post::find($post);
        // $comment=$post->comments()->create($request->all());
        $comment= $post->comments()->create([
            'user_id'=>$request->user_id,
            'post_id'=>$post->id,
            'content'=>$request->content
        ]);
        return response()->json($comment);
    }

    public function update(UpdateCommentRequest $request, $post , $id){
        $post= Post::find($post);
        $updated_comment= $post->comments()->where('id',$id)->first();
        $updated_comment->update([
            'content'=>$request->content
        ]);
        return response()->json($updated_comment);
        $updated_comment->fresh(); #fresh return new instance of the model
        return response()->json($updated_comment);
        

    }

    public function show(Request $request, $post, $id){
        $post=Post::find($post);
        $comment= $post->comments()->where('id',$id)->first();
        return response()->json($comment);
    }

    public function destroy(Request $request, $post,$id){
        $post= Post::find($post);
        $deleted_comment= $post->comments()->where('id',$id)->delete();
        // $updated_comment->fresh(); #fresh return new instance of the model
        return response()->json($deleted_comment);

    }
    
}
