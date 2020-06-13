import { Component, OnInit } from '@angular/core';
import { CoursesService } from "./../../../shared/services/courses.service";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

  addForm: FormGroup;
  submitted: boolean;
  // course:Course=new Course() ;

  constructor(
    private router: Router,
    private fb: FormBuilder,
     private courseService: CoursesService,
     private toastr: ToastrService) {

      let addFormControls = {
        name : new FormControl('',[
          Validators.required,
          Validators.pattern("[A-Za-z . '-]+"),
          Validators.minLength(3)
        ]),

        duration : new FormControl('',[
          Validators.required,
          Validators.pattern("[0-9]+"),
        ]),

        start_date : new FormControl('',[
          Validators.required,
        ]),

        end_date : new FormControl('',[
          Validators.required,
        ]),

        group_limit : new FormControl('',[
          Validators.required,
          Validators.pattern("[0-9]+"),
        ]),

        description : new FormControl('',[
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(5),
        ]),

        instructor_name : new FormControl('',[
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(5),
        ]),

        price : new FormControl('',[
          Validators.required,
          Validators.pattern("[0-9]+"),
        ]),
   
      }

      this.addForm = this.fb.group(addFormControls);

      }



  ngOnInit(): void {
    // this.buildAddForm();
    if(localStorage.getItem("ACCESS_TOKEN")==null){
      this.router.navigate(['/login']);
    }
  }

  onSubmit(){
    this.submitted = true;
    //stop here if form not valid
    if(this.addForm.invalid){
      return;
    }
    // const course = {...this.course}; 
    // this.course.user_id = Number(localStorage.getItem("USER_ID")); 
    this.courseService.add(this.addForm.value).subscribe(
      // this.courseService.add(course).subscribe(

      res => {
        this.toastr.success('Course Add successfuly', 'success', {timeOut:3000, closeButton: true, progressBar: true});
        this.router.navigate(['../admin/courses']);
      },
      // err => {
      //   this.toastr.error(err.statusText, 'Error!', {timeOut:3000, closeButton: true, progressBar: true});
      // }
    );
  }

  // to access inputs
  get f() {return this.addForm.controls;}

  // buildAddForm(){
  //   this.addForm = this.fb.group({
  //     name: [null, Validators.required,Validators.pattern("[A-Za-z .'-]+"),
  //     Validators.minLength(3)],
  //     duration: [null, Validators.required],
  //     start_date: [null, Validators.required],
  //     end_date: [null, Validators.required],
  //     group_limit: [null, Validators.required],
  //     description: [null, Validators.required],
  //     instructor_name: [null, Validators.required],
  //     price: [null, Validators.required],
  //     // user_id: [null, Validators.required],
  //     // category_id: [null, Validators.required],
  //   })
  // }

 

}
