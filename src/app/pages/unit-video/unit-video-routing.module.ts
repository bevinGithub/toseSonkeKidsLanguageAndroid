import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitVideoPage } from './unit-video.page';

const routes: Routes = [
  {
    path: '',
    component: UnitVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitVideoPageRoutingModule {}
