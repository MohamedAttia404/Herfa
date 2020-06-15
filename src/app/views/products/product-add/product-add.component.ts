import { Component, OnInit,ViewChild } from '@angular/core';
import { ProductsService } from "./../../../shared/services/products.service";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-add', 
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  image;
  addForm: FormGroup;
  submitted: boolean;
  constructor(private router: Router,
    private fb: FormBuilder,
     private productService: ProductsService,
     private toastr: ToastrService) { 

      let addFormControls = {
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

      }
      this.addForm = this.fb.group(addFormControls);
     }

  ngOnInit(): void {
    // this.buildAddForm();
  }
   // onFileChange(e){
    onFileChange(event){
    
      const file = (event.target as HTMLInputElement).files[0];
      this.addForm.patchValue({
        profile: file
      });
      this.addForm.get('profile').updateValueAndValidity()
    }
  onSubmit(){
    this.submitted = true;
    //stop here if form not valid
    if(this.addForm.invalid){
      return;
    }
    var formData: any = new FormData();
    formData.append("profile", this.addForm.get('profile').value);
    formData.append("name", this.addForm.get('name').value);
    formData.append("description", this.addForm.get('description').value);
    formData.append("price", this.addForm.get('price').value);
    formData.append("quantity", this.addForm.get('quantity').value);
    formData.append("is_new", this.addForm.get('is_new').value);

console.log(formData);


    // this.productService.add(this.addForm.value).subscribe(
    this.productService.add(formData).subscribe(
      (res:any) => {
        this.toastr.success('Product Add successfuly', 'success', {timeOut:3000, closeButton: true, progressBar: true});
        this.router.navigate(['../admin/products']);
      },
      // err => {
      //   this.toastr.error(err.statusText, 'Error!', {timeOut:3000, closeButton: true, progressBar: true});
      // }
    );
  }
  // get f() {return this.addForm.controls;}

  // buildAddForm(){
  //   this.addForm = this.fb.group({
  //     name: [null, Validators.required, Validators.pattern("[A-Za-z .'-]+"),
  //     Validators.minLength(3)],
  //     description: [null, Validators.required],
  //     //image: [null, Validators.required],
  //     price: [null, Validators.required],
  //     quantity: [null, Validators.required],
  //     is_new: [null, Validators.required],
  //     // user_id: [null, Validators.required],
  //     // category_id: [null, Validators.required],
  //   })
  // }
  get name() { return this.addForm.get('name') }
  get description() { return this.addForm.get('description') }
  get price() { return this.addForm.get('price') }
  get quantity() { return this.addForm.get('quantity') }
  get is_new() { return this.addForm.get('is_new') }

  // onSelectedFile(event){
  //   if (event.target.files.length>0){
  //     const file = event.target.files[0];
  //     this.addForm.get('image').setValue(file);
  //   }
  // }

  
}
