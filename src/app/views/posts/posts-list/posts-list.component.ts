import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.service';
import { ToastrService } from 'ngx-toastr';
import { CommentServiceService } from 'src/app/shared/services/comment-service.service';
import { UserService } from  './../../../shared/services/user.service';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  posts: any=[];
  auth:any;
  
  constructor(private _postsService: PostsService,
    // private toastr: ToastrService,
    private _commentService: CommentServiceService,
    private userService:UserService,
    private toastr: ToastrService) { }
    //===============================================================================
    // getPosts(){
    //   console.log("get posts Component");
//===============================================================================
  getPosts(){
   
    this._postsService.getPosts().subscribe((res: any) =>{
    //  console.log(res.body.data[0].comments[0].id);
    this.posts = res.body.data;
    // console.log(this.posts);
    
    });
  }
//===============================================================================

// public firstPage() {
//   this.posts = [];
//   this._postsService.sendGetRequestToUrl(this._postsService.first).subscribe((res: any) => {
//     console.log(res);
//     this.posts = res.body.data;
//   })
// }

// //===============================================================

public previousPage() {

  if (this._postsService.prev !== undefined && this._postsService.prev !== null) {
    this.posts = [];
    this._postsService.sendGetRequestToUrl(this._postsService.prev).subscribe((res:any) => {
      console.log(res);
      this.posts = res.body.data;
    })
  }

}
// //=============================================================================

public nextPage() {
  if (this._postsService.next !== undefined && this._postsService.next !== null) {
    this.posts = [];
    this._postsService.sendGetRequestToUrl(this._postsService.next).subscribe((res:any) => {
      console.log(res);
      this.posts = res.body.data;
    })
  }
}

// //====================================================================================

// public lastPage() {
//   this.posts = [];
//   this._postsService.sendGetRequestToUrl(this._postsService.last).subscribe((res: any) => {
//     console.log(res);
//     this.posts = res.body.data;
//   })
// }
//================================================================================
deleteItem(id:number){
  console.log("delete");
  
    this._postsService.deletePost(id).subscribe((res:any )=> {
      console.log("hello");
      
    //   this._postsService.getPosts().subscribe((res: any) =>{
    //     console.log(res.body.links);
    //     this.posts = res.body.data;
      });
    }
    // //===============================================================================
    
    //================================================================================
    ngOnInit(): void {
      this.auth=this.userService.isAuthenticated();
      this.getPosts();
  // });
}

deleteComment(post_id:number, comment_id:number){
  this._commentService.deleteComment(post_id,comment_id).subscribe((res:any)=>{
    this.toastr.success('comment deleted successfuly', 'success', {timeOut:1000, closeButton: true, progressBar: true});
      console.log("delete res: "+res);
      
      this.getPosts();
  });
}

//================================================================================
  // ngOnInit(): void {
  //   this.getPosts();
  //   }
    
  }
  