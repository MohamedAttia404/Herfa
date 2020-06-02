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
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  // image;
  user=new user();



  constructor(

    // private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router) {}

  ngOnInit(): void {

  }
  // onFileChange(e){
  //   this.image = e.target.files[0];
  // }
  onSubmit() {
 
    const user = {
      ...this.user
    };
    // user['profile'] = this.image;
    // user['profile'] = this.logo;

    console.log(user);

    // const formData = new FormData();
    //     formData.append('file', this.uploadForm.get('profile').value);

    this.userService.addUser(user).subscribe((res: any) => {
      this.toastr.success('User Add successfuly', 'success', {timeOut:3000, closeButton: true, progressBar: true});
      this.router.navigate(['../admin/users']);
      // this.userService.setToken(res);
      // this.router.navigate(['/users']);
      // console.log("*********** start post**********");
      // console.log(res);
      // console.log("***********end post**********");

    });

  }


}

