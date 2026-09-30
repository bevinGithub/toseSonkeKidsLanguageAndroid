import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestFlipLearnPage } from './guest-flip-learn.page';

const routes: Routes = [
  {
    path: '',
    component: GuestFlipLearnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestFlipLearnPageRoutingModule {}
