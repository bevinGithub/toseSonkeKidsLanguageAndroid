import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpgradeSuccessPageRoutingModule } from './upgrade-success-routing.module';

import { UpgradeSuccessPage } from './upgrade-success.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    UpgradeSuccessPageRoutingModule
  ],
  declarations: [UpgradeSuccessPage]
})
export class UpgradeSuccessPageModule {}
