import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestDashboardPage } from './guest-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: GuestDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestDashboardPageRoutingModule {}
