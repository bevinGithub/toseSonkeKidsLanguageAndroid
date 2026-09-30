import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentOptionsUpgradePageRoutingModule } from './payment-options-upgrade-routing.module';

import { PaymentOptionsUpgradePage } from './payment-options-upgrade.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PaymentOptionsUpgradePageRoutingModule
  ],
  declarations: [PaymentOptionsUpgradePage]
})
export class PaymentOptionsUpgradePageModule {}
