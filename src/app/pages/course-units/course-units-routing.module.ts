import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseUnitsPage } from './course-units.page';

const routes: Routes = [
  {
    path: '',
    component: CourseUnitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseUnitsPageRoutingModule {}
