import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users;
  pages:any[];
  currentPage:number=1;
  constructor(
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router
    ){}

  ngOnInit(): void {
console.log("hello");

    // this.activatedRoute.queryParamMap.subscribe((queryParamMap)=>{
    //   // const limit=queryParamMap.get('limit') || 10 ;
    //   const params={};
    //   queryParamMap.keys.forEach(
    //     (key)=>(params[key]=queryParamMap.get(key))
    //   );
      // this.users=this.userService.getUsers(params).subscribe((res:any)=>{
      this.userService.getUsers().subscribe((res:any)=>{
      // this.users=this.userService.getUsersById(2).subscribe((res:any)=>{
      console.log(res.body);
         
      this.users=res.data;
         
        
      });
    // });
    

  }
  // showUser(id){
  //   this.router.navigate(['/users','profile',id]);
  
  // }

  // deleteUsers(id){
  //   this.userService.deleteUser(id).subscribe((res:any)=>{
  //     // window.location.reload();
  //     // this.router.navigate(['/users']);
  //     this.ngOnInit();
  //   });
  // }

  // onClickUpdate(id){
  //   this.router.navigate(['/users',id,'edit']);

  // }

  // onClickItem(user){
  //   this.userService.changeData(user);
  // }


}
