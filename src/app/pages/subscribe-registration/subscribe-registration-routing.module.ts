import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscribeRegistrationPage } from './subscribe-registration.page';

const routes: Routes = [
  {
    path: '',
    component: SubscribeRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscribeRegistrationPageRoutingModule {}
