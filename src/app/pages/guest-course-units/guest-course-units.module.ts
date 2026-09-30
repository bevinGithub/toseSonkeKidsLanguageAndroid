import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestCourseUnitsPageRoutingModule } from './guest-course-units-routing.module';

import { GuestCourseUnitsPage } from './guest-course-units.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GuestCourseUnitsPageRoutingModule
  ],
  declarations: [GuestCourseUnitsPage]
})
export class GuestCourseUnitsPageModule {}
