import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreeUnitDetailsPageRoutingModule } from './free-unit-details-routing.module';

import { FreeUnitDetailsPage } from './free-unit-details.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FreeUnitDetailsPageRoutingModule
  ],
  declarations: [FreeUnitDetailsPage]
})
export class FreeUnitDetailsPageModule {}
