import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from 'src/app/shared/services/search.service';
import { CourseviewService } from 'src/app/shared/services/courseview.service';


@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {

  searchForm: FormGroup;
  items: any = [];
  flag: boolean = false;

  constructor(
    private courseviewService: CourseviewService,
    private searchService: SearchService,
     private modelService: NgbModal,
     private toastr: ToastrService,
     private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.getAll();
  }

  search(event){
    console.log(event.target.form[1].value);
    let search=event.target.form[1].value;
    console.log(search);
    
    this.courseviewService.search(search).subscribe((res:any) =>{
      console.log(res.data);
      this.flag=true;
     this.items = res.data;
    
  });
  }

    //get all courses
    getAll(){
    //   console.log("getAllComponent");
      
      this.courseviewService.getAll().subscribe(res =>{
       console.log(res);
      this.items = res.data;
  
      // this.coursesService.getAll().subscribe((courses: any[])=>{
      //   console.log(courses);
      //   this.courses_arr = courses;
      });
    }


    // previousPage
public previousPage() {

  if (this.searchService.prev !== undefined && this.searchService.prev !== null) {
    this.items = [];
    this.searchService.sendGetRequestToUrl(this.searchService.prev).subscribe((res:any) => {
      console.log(res);
      this.items = res.body.data;
    })
  }

}
// //=============================================================================

// nextPage
public nextPage() {
  if (this.searchService.next !== undefined && this.searchService.next !== null) {
    this.items = [];
    this.searchService.sendGetRequestToUrl(this.searchService.next).subscribe((res:any) => {
      console.log(res);
      this.items = res.body.data;
    })
  }
}

  // to access inputs
  get f() {return this.searchForm.controls; }

}
