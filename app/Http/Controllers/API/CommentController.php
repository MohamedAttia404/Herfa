<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Post;
use App\User;
use App\Comment;

class CommentController extends Controller
{
    //
    public function store(Request $request, $post){
        $post= Post::find($post);
        $user= Auth::id();
        $comment= $post->comments()->create([
            'user_id'=>$user,
            'post_id'=>$post->id,
            'content'=>$request->content
        ]);
        return response()->json($comment);
    }

    public function update(Request $request, $post,$id){
        // dd(Comment::find(5));
        $post= Post::find($post);
        // dd($post);
        // $updated_comment= $post->comments()->where('id',$id)->update([
        //     'content'=>$request->content
        // ]);
        $updated_comment= $post->comments()->where('id',$id)->update($request->all());
        // dd($updated_comment);
        // $updated_comment->fresh(); #fresh return new instance of the model
        return response()->json($post->comments()->where('id',$id)->first());

    }

    public function show(Request $request, $post, $id){
        $post=Post::find($post);
        $comment= $post->comments()->where('id',$id)->first();
        return response()->json($comment);
    }

    public function destroy(Request $request, $post,$id){
        // dd(Comment::find(5));
        $post= Post::find($post);
        // dd($post);
        // $updated_comment= $post->comments()->where('id',$id)->update([
        //     'content'=>$request->content
        // ]);
        $deleted_comment= $post->comments()->where('id',$id)->delete();
        // dd($updated_comment);
        // $updated_comment->fresh(); #fresh return new instance of the model
        return response()->json($deleted_comment);

    }
    
}
