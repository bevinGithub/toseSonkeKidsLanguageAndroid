import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseUnitDetailsPage } from './course-unit-details.page';

const routes: Routes = [
  {
    path: '',
    component: CourseUnitDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseUnitDetailsPageRoutingModule {}
