import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseUnitDetailsPageRoutingModule } from './course-unit-details-routing.module';

import { CourseUnitDetailsPage } from './course-unit-details.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CourseUnitDetailsPageRoutingModule
  ],
  declarations: [CourseUnitDetailsPage]
})
export class CourseUnitDetailsPageModule {}
