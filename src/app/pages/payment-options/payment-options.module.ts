import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentOptionsPageRoutingModule } from './payment-options-routing.module';

import { PaymentOptionsPage } from './payment-options.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PaymentOptionsPageRoutingModule
  ],
  declarations: [PaymentOptionsPage]
})
export class PaymentOptionsPageModule {}
