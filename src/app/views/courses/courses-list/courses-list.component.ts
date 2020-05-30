import { Component, OnInit } from '@angular/core';
import { CoursesService } from "./../../../shared/services/courses.service";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  items: any = [];

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.getAll();
    
  }

  //get all courses
  getAll(){
    console.log("getAllComponent");
    
    this.coursesService.getAll().subscribe(res =>{
     console.log(res);
    this.items = res;

    // this.coursesService.getAll().subscribe((courses: any[])=>{
    //   console.log(courses);
    //   this.courses_arr = courses;
    });
  }

}
