import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { CommentServiceService } from 'src/app/shared/services/comment-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  comment: Comment = new Comment();
  post_id: number = 0;

  private routeSub: Subscription
  //=============================================================

  constructor(private _commentService: CommentServiceService, private _router: Router, private route: ActivatedRoute) { }
  //=============================================================

  ngOnInit(): void {
    if(localStorage.getItem("USER_ID")==null){
      console.log("login");
      this._router.navigate(['/login']);
    }else{
      this.routeSub = this.route.params.subscribe(params => {
        console.log(params) //log the entire params object
        console.log(params['id']) //log the value of id
        this.post_id=params['id'];
      
      });
    }
  }

  //=============================================================
  onSubmit(form: NgForm){
    console.log(form);
    if(form.valid){
      const comment = {...this.comment};
      // comment.id=
      console.log(this.comment);
      
      this._commentService.addComment(this.post_id,comment).subscribe((res: any)=>{
      console.log(res);
        this._router.navigate(['/user/posts']);
  
      });
    }
  }

}
