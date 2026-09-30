import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentCancelledPageRoutingModule } from './payment-cancelled-routing.module';

import { PaymentCancelledPage } from './payment-cancelled.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PaymentCancelledPageRoutingModule
  ],
  declarations: [PaymentCancelledPage]
})
export class PaymentCancelledPageModule {}
