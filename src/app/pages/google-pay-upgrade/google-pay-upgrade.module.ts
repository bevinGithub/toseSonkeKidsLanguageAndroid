import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GooglePayUpgradePageRoutingModule } from './google-pay-upgrade-routing.module';

import { GooglePayUpgradePage } from './google-pay-upgrade.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GooglePayUpgradePageRoutingModule
  ],
  declarations: [GooglePayUpgradePage]
})
export class GooglePayUpgradePageModule {}
