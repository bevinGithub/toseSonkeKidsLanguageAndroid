import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestSingLearnPage } from './guest-sing-learn.page';

const routes: Routes = [
  {
    path: '',
    component: GuestSingLearnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestSingLearnPageRoutingModule {}
