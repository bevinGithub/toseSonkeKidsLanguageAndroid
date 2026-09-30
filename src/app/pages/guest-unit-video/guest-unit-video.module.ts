import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestUnitVideoPageRoutingModule } from './guest-unit-video-routing.module';

import { GuestUnitVideoPage } from './guest-unit-video.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GuestUnitVideoPageRoutingModule
  ],
  declarations: [GuestUnitVideoPage]
})
export class GuestUnitVideoPageModule {}
