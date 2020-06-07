import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseviewRoutingModule } from './courseview-routing.module';
import { CourseViewComponent } from './course-view/course-view.component';


@NgModule({
  declarations: [CourseViewComponent],
  imports: [
    CommonModule,
    CourseviewRoutingModule
  ]
})
export class CourseviewModule { }
