import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreeUnitLessonsPage } from './free-unit-lessons.page';

const routes: Routes = [
  {
    path: '',
    component: FreeUnitLessonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreeUnitLessonsPageRoutingModule {}
