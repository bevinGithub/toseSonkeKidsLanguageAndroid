import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchLearnPage } from './watch-learn.page';

const routes: Routes = [
  {
    path: '',
    component: WatchLearnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchLearnPageRoutingModule {}
