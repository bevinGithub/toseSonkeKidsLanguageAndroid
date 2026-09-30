import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentCancelledPage } from './payment-cancelled.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentCancelledPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentCancelledPageRoutingModule {}
