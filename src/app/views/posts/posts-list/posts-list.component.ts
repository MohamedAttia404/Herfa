import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  posts: any=[];
  

  constructor(private _postsService: PostsService) { }

  getPosts(){
    console.log("get posts Component");
   
    this._postsService.getPosts().subscribe((res: any) =>{
     console.log(res.links);
    this.posts = res.data;
    });
  }

  ngOnInit(): void {
    this.getPosts();
  }

}
