import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UserService
} from './../../../shared/services/user.service';
import {user} from './../../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  image;
  user=new user();
  uploadForm: FormGroup;  


  constructor(

    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router) {}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: [null],
      first_name: [''],
     last_name: [''],
     mobile: [''],
     national_id: [''],
     role: [''],
     email: [''],
     password: [''],
     password_confirmation: ['']
   
    });

  }

  // onFileChange(e){
  onFileChange(event){
    
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({
      profile: file
    });
    this.uploadForm.get('profile').updateValueAndValidity()
  }

  onSubmit() {
 
    console.log(this.uploadForm.value);
   var formData: any = new FormData();
    formData.append("profile", this.uploadForm.get('profile').value);
    formData.append("first_name", this.uploadForm.get('first_name').value);
    formData.append("last_name", this.uploadForm.get('last_name').value);
    formData.append("mobile", this.uploadForm.get('mobile').value);
    formData.append("national_id", this.uploadForm.get('national_id').value);
    formData.append("role", this.uploadForm.get('role').value);
    formData.append("email", this.uploadForm.get('email').value);
    formData.append("password", this.uploadForm.get('password').value);
    formData.append("password_confirmation", this.uploadForm.get('password_confirmation').value); 

  
    
    this.userService.addUser(formData).subscribe((res: any) => {
      this.toastr.success('User Add successfuly', 'success', {timeOut:3000, closeButton: true, progressBar: true});
      this.router.navigate(['../admin/users']);


     } );

  }


}

