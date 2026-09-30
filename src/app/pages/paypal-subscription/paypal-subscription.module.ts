import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaypalSubscriptionPageRoutingModule } from './paypal-subscription-routing.module';

import { PaypalSubscriptionPage } from './paypal-subscription.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PaypalSubscriptionPageRoutingModule
  ],
  declarations: [PaypalSubscriptionPage]
})
export class PaypalSubscriptionPageModule {}
