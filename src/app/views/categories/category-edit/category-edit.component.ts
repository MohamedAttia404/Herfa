import { Component, OnInit } from '@angular/core';
import { CategoriesService } from "./../../../shared/services/categories.service";
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  editForm: FormGroup;
  submitted: boolean;
  categoryId;

  categoryDetails= {};
  category:Category=new Category() ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
     private categoriesService: CategoriesService,
     private toastr: ToastrService) {

      let editFormControls = {
        title : new FormControl('',[
          Validators.required,
          Validators.pattern("[A-Za-z . '-]+"),
          Validators.minLength(3)
        ]),
    }

    this.editForm = this.fb.group(editFormControls);

      }

  ngOnInit(): void {
    // this.buildEditForm();

    // GEt course data id
    this.route.params.subscribe(params => {
      // this.courseId = params.id;
      this.category.id =  params.id;
      this.categoriesService.getCourse(params.id).subscribe((res:any) => {
        // console.log("res"+res.data.name);
        // this.courseDetails = res;
        this.category = res.data;
        // console.log("details"+this.courseDetails);
      });
      
    });
  }

  // to access inputs
  get f() {return this.editForm.controls; }

  // buildEditForm(){
  //   this.editForm = this.fb.group({
  //     title: [null, Validators.required],
  //   });
  // }


  onSubmit(){
    // console.log(form);
    this.submitted = true;
    //stop here if form not valid
    if(this.editForm.invalid){
      return;
    }
    // if(form.valid){
      const category = {...this.category};
      this.categoriesService.update(category,this.category.id).subscribe((res: any)=>{
        console.log(res);
        
        this.router.navigate(['../admin/categories']);
  
      });
    // }
  }

}
