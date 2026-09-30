import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestPracticeTimePageRoutingModule } from './guest-practice-time-routing.module';

import { GuestPracticeTimePage } from './guest-practice-time.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GuestPracticeTimePageRoutingModule
  ],
  declarations: [GuestPracticeTimePage]
})
export class GuestPracticeTimePageModule {}
