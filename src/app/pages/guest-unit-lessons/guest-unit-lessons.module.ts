import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestUnitLessonsPageRoutingModule } from './guest-unit-lessons-routing.module';

import { GuestUnitLessonsPage } from './guest-unit-lessons.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GuestUnitLessonsPageRoutingModule
  ],
  declarations: [GuestUnitLessonsPage]
})
export class GuestUnitLessonsPageModule {}
