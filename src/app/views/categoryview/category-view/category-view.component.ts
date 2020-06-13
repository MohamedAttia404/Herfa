import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CategoryviewService } from 'src/app/shared/services/categoryview.service';
import { Interest } from 'src/app/models/interest';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {

  items: any = [];
  interests: Interest =new Interest();
  interests_arr :any=[];

  // checked: boolean= false;
  disableButton: boolean= false;

  constructor(
    private categoryviewService: CategoryviewService,
     private modelService: NgbModal,
     private toastr: ToastrService,
     private fb: FormBuilder,
     private _router: Router) { }

     ngOnInit(): void {
      this.getAll();
      this.getInterest();
    }

      //get all courses
  getAll(){
    console.log("getAllComponent");
    
    this.categoryviewService.getAll().subscribe((res:any) =>{
     console.log(res.body.data);
    this.items = res.body.data;
    

    // this.coursesService.getAll().subscribe((courses: any[])=>{
    //   console.log(courses);
    //   this.courses_arr = courses;
    });
  }

// previousPage
public previousPage() {

  if (this.categoryviewService.prev !== undefined && this.categoryviewService.prev !== null) {
    this.items = [];
    this.categoryviewService.sendGetRequestToUrl(this.categoryviewService.prev).subscribe((res:any) => {
      console.log(res+"sh3;ala fel back");
      this.items = res.body.data;
    })
  }

}
// //=============================================================================

// nextPage
public nextPage() {
  if (this.categoryviewService.next !== undefined && this.categoryviewService.next !== null) {
    this.items = [];
    this.categoryviewService.sendGetRequestToUrl(this.categoryviewService.next).subscribe((res:any) => {
      console.log(res);
      this.items = res.body.data;
    })
  }
}



  // Delete Course
  deleteItem(model, id){
    this.modelService.open(model).result.then(result => {
      this.categoryviewService.delete(id).subscribe(res => {
        this.toastr.success('Category deleted successfuly', 'success', {timeOut:3000, closeButton: true, progressBar: true});
        console.log(res);
        
        this.getAll();
    },
    err => {
      this.toastr.error(err.statusText, 'Error!', {timeOut:3000, closeButton: true, progressBar: true});
      console.log(err);
      
      
      }
     );
    },
    reason => {
      console.log(reason);
    });
  }


  //================================ interest/ subscribe ======================
  interest1(id: number){
    console.log(id);
    let interests = id;
    
      console.log("interest array is empty");
      this.categoryviewService.interest(interests).subscribe((res: any)=>{
        console.log(res);
        // this._router.navigate(['/categoryview']);
      });
   // }
   

  }

    //================================ interest/ subscribe ======================
    remove_interest(id: number){
      let interests;
      console.log(this.interests_arr);
      
      this.interests_arr.map((res)=>{
        if(res.category_id==id){
          interests= res.id
        }
      });
    console.log(interests);
    
      this.categoryviewService.remove_interest(interests).subscribe((res: any)=>{
        console.log(res);
        // this._router.navigate(['/categoryview']);
      });
  
    }

    //=========================================
getInterest(){
  const user_id = localStorage.getItem('USER_ID');
  this.categoryviewService.getInterest(user_id).subscribe((res:any)=>{
    console.log(res);
    this.interests_arr=res;
    // this._router.navigate(['/user/categoryview']);
    
  })
}

// interest(cat_id){
//   console.log(cat_id);
  
//   if(this.interests_arr != []){
//     console.log("interests arr not empty");
//     this.interests_arr.map((res)=>{
//       console.log(res);
      
//       if(res.category_id==cat_id){
//         console.log("exist");
        
//         this.categoryviewService.remove_interest(res.id).subscribe((res:any)=>{
//           console.log("remove "+res); 
//         });
//       }else{
//         this.categoryviewService.interest(res.category_id).subscribe((res:any)=>{
//           console.log("interest "+res);
          
//         });
//       }
//     });
    
//   }else{
//     console.log("interests is empty");
    
//     this.categoryviewService.interest(cat_id).subscribe((res:any)=>{
//       console.log("interest "+res);
      
//     });
//   }

// }

}
