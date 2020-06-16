import { Component, OnInit } from '@angular/core';
import { ProductsService } from "./../../../shared/services/products.service";
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CategoriesService } from "./../../../shared/services/categories.service";
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  editForm: FormGroup;
  submitted: boolean;
  productId;
  image;
  categories:any=[];
  userid;
  // courseDetails:Array<object> = [];
  productDetails= {};
  product:Product=new Product() ;
  constructor(    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
     private productService: ProductsService,
     private categoriesService: CategoriesService,
     private toastr: ToastrService) {


      let editFormControls = {
        profile: [null],
        name : new FormControl('',[
          Validators.required,
          Validators.pattern("[A-Za-z .'-]+"),
          Validators.minLength(3)
        ]),
  
        description : new FormControl('',[
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(5),
        ]),
  
        price: new FormControl('',[
          Validators.required,
          Validators.pattern("[0-9]+"),
        ]),
        quantity: new FormControl('',[
          Validators.required,
          Validators.pattern("[0-9]+"),
        ]),
        is_new: new FormControl('',[
          Validators.required,
          Validators.pattern("[0-1]"),
        ]),
        user_id: [''],
        category_id: [null],

      }
      this.editForm = this.fb.group(editFormControls);
      }

  ngOnInit(): void {
    // this.buildEditForm();

    // GEt course data id
    this.route.params.subscribe(params => {
      // this.courseId = params.id;
      this.product.id =  params.id;
      this.productService.getProduct(params.id).subscribe((res:any) => {
        // console.log(res.data);
        // this.courseDetails = res;
        this.image=res.data.image;
        this.product = res.data;
        this.product.user_id= res.data.user.id;
        this.product.category_id= res.data.category.id;

        console.log(this.product);
        
        // console.log("details"+this.courseDetails);
      });
      
    });
    this.categoriesService.allCategory().subscribe((res: any) =>{
      
      // this.userid=Number(localStorage.getItem("USER_ID"));
     this.categories = res.data;
 
     });
  }
  get f() {return this.editForm.controls; }

  // buildEditForm(){
  //   this.editForm = this.fb.group({
  //     name: [null, Validators.required],
  //     description: [null, Validators.required],
  //     //image: [null, Validators.required],
  //     price: [null, Validators.required],
  //     quantity: [null, Validators.required],
  //     is_new: [null, Validators.required],
  //           user_id: [''],
  //     category_id: [null],
  //     // user_id: [null, Validators.required],
  //     // category_id: [null, Validators.required],
  //   });
  // }

  onSubmit(){
    this.submitted = true;
    //stop here if form not valid
    if(this.editForm.invalid){
      return;
    }
    // this.submitted = true;
    // console.log("update");
    // if(form.valid){
      const product = {...this.product};
      // this.product['user_id']=Number(localStorage.getItem("USER_ID"));
      // console.log(product);
      this.productService.update(product,this.product.id).subscribe((res: any)=>{
        console.log(res);
        
        this.router.navigate(['../admin/products']);
  
      });
    // }
  }

}
