import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlipLearnPage } from './flip-learn.page';

const routes: Routes = [
  {
    path: '',
    component: FlipLearnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlipLearnPageRoutingModule {}
