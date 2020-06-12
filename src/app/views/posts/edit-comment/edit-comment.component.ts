import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { CommentServiceService } from 'src/app/shared/services/comment-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  comment: Comment= new Comment();
  post_id: number=0;
  comment_id: number=0;


  constructor(private _commentService: CommentServiceService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    if(localStorage.getItem("USER_ID")==null){
      console.log("login");
      this._router.navigate(['/login']);
    
    
    }else{
    this._route.params.subscribe(params => {
      console.log( params);
      
      // this..id = params.id;
      // console.log("post of id");
      
      this._commentService.getCommentById(params.post_id, params.comment_id).subscribe((res:any) => {
        console.log(res);
        this.comment = res;
        this.post_id=params.post_id;
        this.comment_id=params.comment_id;

      });
    });
  }

  }

  //===============================================================

  onSubmit(form: NgForm){
    console.log(form);
    if(form.valid){
      const comment = {...this.comment};
      console.log("edit form "+this.comment.content);
      
      this._commentService.updateComment(this.post_id, this.comment_id,this.comment).subscribe((res: any)=>{
        console.log(res);
        
        this._router.navigate(['/user/posts']);
  
      });
    }
  }

}
