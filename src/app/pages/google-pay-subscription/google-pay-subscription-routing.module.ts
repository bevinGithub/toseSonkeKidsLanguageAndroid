import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GooglePaySubscriptionPage } from './google-pay-subscription.page';

const routes: Routes = [
  {
    path: '',
    component: GooglePaySubscriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GooglePaySubscriptionPageRoutingModule {}
