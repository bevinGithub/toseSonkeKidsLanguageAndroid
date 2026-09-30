import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestCourseUnitsPage } from './guest-course-units.page';

const routes: Routes = [
  {
    path: '',
    component: GuestCourseUnitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestCourseUnitsPageRoutingModule {}
