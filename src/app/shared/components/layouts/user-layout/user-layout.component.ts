import { Component, OnInit } from '@angular/core';

 import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {
  auth:any;

  constructor(
    private userService: UserService,

  ) { }

  ngOnInit(): void {
    this.auth=this.userService.isAuthenticated();
  }

}
