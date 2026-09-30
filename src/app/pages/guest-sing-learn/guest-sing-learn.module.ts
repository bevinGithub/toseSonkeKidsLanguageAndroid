import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestSingLearnPageRoutingModule } from './guest-sing-learn-routing.module';

import { GuestSingLearnPage } from './guest-sing-learn.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GuestSingLearnPageRoutingModule
  ],
  declarations: [GuestSingLearnPage]
})
export class GuestSingLearnPageModule {}
