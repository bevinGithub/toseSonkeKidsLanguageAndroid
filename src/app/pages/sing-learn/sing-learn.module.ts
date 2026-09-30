import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingLearnPageRoutingModule } from './sing-learn-routing.module';

import { SingLearnPage } from './sing-learn.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SingLearnPageRoutingModule
  ],
  declarations: [SingLearnPage]
})
export class SingLearnPageModule {}
