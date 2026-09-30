import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpgradeSubscriptionPageRoutingModule } from './upgrade-subscription-routing.module';

import { UpgradeSubscriptionPage } from './upgrade-subscription.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    UpgradeSubscriptionPageRoutingModule
  ],
  declarations: [UpgradeSubscriptionPage]
})
export class UpgradeSubscriptionPageModule {}
