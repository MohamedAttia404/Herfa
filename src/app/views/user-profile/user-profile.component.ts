import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user;
  constructor(
    private userService:UserService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
this.activatedRoute.paramMap.subscribe((paramMap)=>{
      if(paramMap.has('id')){
        const id=paramMap.get('id');
        this.user=this.userService.getUsersById(id).subscribe((res:any)=>{
          console.log(res.data);
              this.user=res.data;            
          });
        }
        });

}
}
