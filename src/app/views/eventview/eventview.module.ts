import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventviewRoutingModule } from './eventview-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventViewComponent } from './event-view/event-view.component';


@NgModule({
  declarations: [EventViewComponent],
  imports: [
    CommonModule,
    EventviewRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EventviewModule { }
