import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentSuccessPageRoutingModule } from './payment-success-routing.module';

import { PaymentSuccessPage } from './payment-success.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PaymentSuccessPageRoutingModule
  ],
  declarations: [PaymentSuccessPage]
})
export class PaymentSuccessPageModule {}
