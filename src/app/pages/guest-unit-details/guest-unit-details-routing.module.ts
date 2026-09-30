import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestUnitDetailsPage } from './guest-unit-details.page';

const routes: Routes = [
  {
    path: '',
    component: GuestUnitDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestUnitDetailsPageRoutingModule {}
