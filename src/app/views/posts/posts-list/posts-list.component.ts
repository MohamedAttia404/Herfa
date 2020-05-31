import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  posts: any=[];
  post: Post = new Post();
  emptyValue1: string = ''; //to empty input text after submission
  emptyValue2: string = '';


  constructor(private _postsService: PostsService, private _router: Router) { }
//===============================================================================
  getPosts(){
    console.log("get posts Component");
   
    this._postsService.getPosts().subscribe((res: any) =>{
     console.log(res.links);
    this.posts = res.data;
    });
  }
//================================================================================
onSubmit(form: NgForm){
  console.log(form);
  if(form.valid){
    const post = {...this.post};
    this._postsService.addPost(post).subscribe((res: any)=>{
      console.log(res);
      this.emptyValue1 = '';
      this.emptyValue2 = '';
      // this._router.navigate(['/user/posts']);

    });
  }
}
//================================================================================
  ngOnInit(): void {
    this.getPosts();
  }

}
