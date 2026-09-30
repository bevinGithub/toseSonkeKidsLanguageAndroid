import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestTapLearnPage } from './guest-tap-learn.page';

const routes: Routes = [
  {
    path: '',
    component: GuestTapLearnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestTapLearnPageRoutingModule {}
