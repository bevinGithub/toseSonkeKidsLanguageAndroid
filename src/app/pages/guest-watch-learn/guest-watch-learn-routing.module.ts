import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestWatchLearnPage } from './guest-watch-learn.page';

const routes: Routes = [
  {
    path: '',
    component: GuestWatchLearnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestWatchLearnPageRoutingModule {}
