import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GooglePayUpgradePage } from './google-pay-upgrade.page';

const routes: Routes = [
  {
    path: '',
    component: GooglePayUpgradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GooglePayUpgradePageRoutingModule {}
