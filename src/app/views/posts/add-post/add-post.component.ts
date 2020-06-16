import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/shared/services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPost: FormGroup;
  submitted: boolean;
  post: Post = new Post();
  emptyValue1: string = ''; //to empty input text after submission
  emptyValue2: string = '';

  //=============================================================
  constructor(private _postsService: PostsService,
     private _router: Router,
     private fb: FormBuilder,) { 


    let addPostControls = {
        
      name : new FormControl('',[
        Validators.required,
        Validators.pattern("[A-Za-z . '-]+"),
        Validators.minLength(3)
      ]),

      duration : new FormControl('',[
        Validators.required,
        Validators.pattern("[0-9]+"),
      ]),

      start_date : new FormControl('',[
        Validators.required,
      ]),

      end_date : new FormControl('',[
        Validators.required,
      ]),

      group_limit : new FormControl('',[
        Validators.required,
        Validators.pattern("[0-9]+"),
      ]),

      description : new FormControl('',[
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(5),
      ]),

      instructor_name : new FormControl('',[
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(5),
      ]),

      price : new FormControl('',[
        Validators.required,
        Validators.pattern("[0-9]+"),
      ]),

      user_id : new FormControl(''),

      category_id : new FormControl(''),
 
    }

    this.addPost = this.fb.group(addPostControls);

  }

  //==============================================================
  ngOnInit(): void {
    this.submitted = true;
    //stop here if form not valid
    if(this.addPost.invalid){
      return;
    }


    if(localStorage.getItem("USER_ID")==null){
      console.log("login");
      this._router.navigate(['/login']);
    }
  }

    // to access inputs
    get f() {return this.addPost.controls;}
  //===============================================================

  onSubmit(form: NgForm){
    console.log(form);
    if(form.valid){
      const post = {...this.post};
      this.post.user_id = Number(localStorage.getItem("USER_ID"));
      console.log(this.post);
      
      this._postsService.addPost(post).subscribe((res: any)=>{
      console.log(res);
        // console.log("hell " +res.user_id);
        this.emptyValue1 = '';
        this.emptyValue2 = '';
        this._router.navigate(['/user/posts']);
  
      });
    }
  }

}
