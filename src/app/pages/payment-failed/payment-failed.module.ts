import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentFailedPageRoutingModule } from './payment-failed-routing.module';

import { PaymentFailedPage } from './payment-failed.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PaymentFailedPageRoutingModule
  ],
  declarations: [PaymentFailedPage]
})
export class PaymentFailedPageModule {}
