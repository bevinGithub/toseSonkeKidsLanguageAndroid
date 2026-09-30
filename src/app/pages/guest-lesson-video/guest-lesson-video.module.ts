import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestLessonVideoPageRoutingModule } from './guest-lesson-video-routing.module';

import { GuestLessonVideoPage } from './guest-lesson-video.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GuestLessonVideoPageRoutingModule
  ],
  declarations: [GuestLessonVideoPage]
})
export class GuestLessonVideoPageModule {}
