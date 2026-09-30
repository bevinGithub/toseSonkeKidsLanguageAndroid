import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GooglePaySubscriptionPageRoutingModule } from './google-pay-subscription-routing.module';

import { GooglePaySubscriptionPage } from './google-pay-subscription.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GooglePaySubscriptionPageRoutingModule
  ],
  declarations: [GooglePaySubscriptionPage]
})
export class GooglePaySubscriptionPageModule {}
