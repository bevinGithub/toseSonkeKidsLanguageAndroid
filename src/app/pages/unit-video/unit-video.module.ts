import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnitVideoPageRoutingModule } from './unit-video-routing.module';

import { UnitVideoPage } from './unit-video.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    UnitVideoPageRoutingModule
  ],
  declarations: [UnitVideoPage]
})
export class UnitVideoPageModule {}
