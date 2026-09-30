import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TapLearnPage } from './tap-learn.page';

const routes: Routes = [
  {
    path: '',
    component: TapLearnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TapLearnPageRoutingModule {}
