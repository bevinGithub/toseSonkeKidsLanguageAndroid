import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestLessonsPageRoutingModule } from './guest-lessons-routing.module';

import { GuestLessonsPage } from './guest-lessons.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GuestLessonsPageRoutingModule
  ],
  declarations: [GuestLessonsPage]
})
export class GuestLessonsPageModule {}
