import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PracticeTimePageRoutingModule } from './practice-time-routing.module';

import { PracticeTimePage } from './practice-time.page';
import { SharedModule } from 'src/app/components/shared.mobule';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PracticeTimePageRoutingModule
  ],
  declarations: [PracticeTimePage]
})
export class PracticeTimePageModule {}
