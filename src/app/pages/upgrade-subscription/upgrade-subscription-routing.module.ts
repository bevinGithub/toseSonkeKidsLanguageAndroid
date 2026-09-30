import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpgradeSubscriptionPage } from './upgrade-subscription.page';

const routes: Routes = [
  {
    path: '',
    component: UpgradeSubscriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpgradeSubscriptionPageRoutingModule {}
