import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestUnitDetailsPageRoutingModule } from './guest-unit-details-routing.module';

import { GuestUnitDetailsPage } from './guest-unit-details.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GuestUnitDetailsPageRoutingModule
  ],
  declarations: [GuestUnitDetailsPage]
})
export class GuestUnitDetailsPageModule {}
