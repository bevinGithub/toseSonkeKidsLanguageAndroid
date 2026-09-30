import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestPlayerPage } from './guest-player.page';

const routes: Routes = [
  {
    path: '',
    component: GuestPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestPlayerPageRoutingModule {}
