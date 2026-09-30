import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestSigninPage } from './guest-signin.page';

const routes: Routes = [
  {
    path: '',
    component: GuestSigninPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestSigninPageRoutingModule {}
