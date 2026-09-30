import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitProgressPage } from './unit-progress.page';

const routes: Routes = [
  {
    path: '',
    component: UnitProgressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitProgressPageRoutingModule {}
