import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
// import { UserService } from '../users/services/user.service';
// import { user } from '../users/models/user.model';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user= new user();
  uploadForm: FormGroup; 
  submitted = false; 
  constructor(
     private userService:UserService,
     private formBuilder: FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.uploadForm = this.formBuilder.group(
      {
      // profile:new FormControl ('',[Validators.required,]),
      first_name: new FormControl ('',[Validators.required,Validators.pattern("[A-Za-z . '-]+"), Validators.minLength(3)]),
      last_name:  new FormControl ('',[Validators.required,Validators.pattern("[A-Za-z . '-]+"), Validators.minLength(3)]),
      email:  new FormControl ('',[Validators.required,Validators.email]),
      role:  new FormControl ('',[Validators.required,]),
      national_id:  new FormControl ('',[Validators.pattern("[0-9]+"),Validators.maxLength(14)]),
      mobile:  new FormControl ('',[Validators.pattern("[0-9]+"),Validators.maxLength(14)]),
    //  latitude:  new FormControl ('',[]),
    //  longitude: new FormControl ('',[]),
    //  address:  new FormControl ('',[Validators.required,]),
     password:  new FormControl ('',[Validators.required,Validators.minLength(6)]),
     password_confirmation:  new FormControl ('',[Validators.required,Validators.minLength(6)]),
   
    });
  }
    onSubmit(){   
      this.submitted = true;
      if (this.uploadForm.invalid) {
        return;
      }
      // const user={...this.user};


      this.userService.addUser(this.uploadForm.value).subscribe((res: any)=>{
      this.userService.setToken(res);
      this.router.navigate(['/user/posts',]);
    
    });
    
    }

}
