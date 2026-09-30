import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestUnitLessonsPage } from './guest-unit-lessons.page';

const routes: Routes = [
  {
    path: '',
    component: GuestUnitLessonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestUnitLessonsPageRoutingModule {}
