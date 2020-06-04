import { Component, OnInit } from '@angular/core';
import { CourseviewService } from "./../../../shared/services/courseview.service";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {

  items: any = [];

  constructor(
    private courseviewService: CourseviewService,
     private modelService: NgbModal,
     private toastr: ToastrService) { }

  ngOnInit(): void {
  }

}
