import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { loginuser } from 'src/app/models/loginuser.model';
import { UserService } from 'src/app/shared/services/user.service';
// import {UserService} from '../users/services/user.service';
// import {loginuser} from './loginUser.model';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new loginuser();
  uploadForm: FormGroup; 
  submitted = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group(
      {
     email:  new FormControl ('',[Validators.required,Validators.email]), 
     password:  new FormControl ('',[Validators.required,Validators.minLength(6)]),
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.uploadForm.invalid) {
      return;
    }




    this.userService.singIn(this.uploadForm.value).subscribe((res: any) => {

        this.userService.setToken(res.data);
        this.router.navigate(['/user/posts']);
    }, error => {
      this.toastr.error(error.statusText, 'Email Or Password  May be Not Correct!', {timeOut:3000, closeButton: true, progressBar: true});
      
  });
    

  }


}
