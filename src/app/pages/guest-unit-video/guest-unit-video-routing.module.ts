import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestUnitVideoPage } from './guest-unit-video.page';

const routes: Routes = [
  {
    path: '',
    component: GuestUnitVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestUnitVideoPageRoutingModule {}
