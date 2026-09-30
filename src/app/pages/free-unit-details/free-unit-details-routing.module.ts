import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreeUnitDetailsPage } from './free-unit-details.page';

const routes: Routes = [
  {
    path: '',
    component: FreeUnitDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreeUnitDetailsPageRoutingModule {}
