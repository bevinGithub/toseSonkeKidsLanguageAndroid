import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicyLoggedPage } from './policy-logged.page';

const routes: Routes = [
  {
    path: '',
    component: PolicyLoggedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyLoggedPageRoutingModule {}
