import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpgradeOptionsPage } from './upgrade-options.page';

const routes: Routes = [
  {
    path: '',
    component: UpgradeOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpgradeOptionsPageRoutingModule {}
