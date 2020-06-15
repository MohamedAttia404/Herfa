import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutusRoutingModule } from './aboutus-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';


@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    AboutusRoutingModule
  ]
})
export class AboutusModule { }
