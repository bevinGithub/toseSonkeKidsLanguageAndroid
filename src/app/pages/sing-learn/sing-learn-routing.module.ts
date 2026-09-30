import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingLearnPage } from './sing-learn.page';

const routes: Routes = [
  {
    path: '',
    component: SingLearnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingLearnPageRoutingModule {}
