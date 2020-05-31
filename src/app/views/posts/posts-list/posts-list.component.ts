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
     console.log(res.body.links);
    this.posts = res.body.data;
    });
  }
//===============================================================================

public firstPage() {
  this.posts = [];
  this._postsService.sendGetRequestToUrl(this._postsService.first).subscribe((res: any) => {
    console.log(res);
    this.posts = res.body.data;
  })
}

// //===============================================================

public previousPage() {

  if (this._postsService.prev !== undefined && this._postsService.prev !== '') {
    this.posts = [];
    this._postsService.sendGetRequestToUrl(this._postsService.prev).subscribe((res:any) => {
      console.log(res);
      this.posts = res.body.data;
    })
  }

}
// //=============================================================================

public nextPage() {
  if (this._postsService.next !== undefined && this._postsService.next !== '') {
    this.posts = [];
    this._postsService.sendGetRequestToUrl(this._postsService.next).subscribe((res:any) => {
      console.log(res);
      this.posts = res.body.data;
    })
  }
}

// //====================================================================================

public lastPage() {
  this.posts = [];
  this._postsService.sendGetRequestToUrl(this._postsService.last).subscribe((res: any) => {
    console.log(res);
    this.posts = res.body.data;
  })
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
