import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaypalSubscriptionPage } from './paypal-subscription.page';

const routes: Routes = [
  {
    path: '',
    component: PaypalSubscriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaypalSubscriptionPageRoutingModule {}
