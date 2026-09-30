import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseUnitsPageRoutingModule } from './course-units-routing.module';

import { CourseUnitsPage } from './course-units.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CourseUnitsPageRoutingModule
  ],
  declarations: [CourseUnitsPage]
})
export class CourseUnitsPageModule {}
