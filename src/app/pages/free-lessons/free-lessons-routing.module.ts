import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreeLessonsPage } from './free-lessons.page';

const routes: Routes = [
  {
    path: '',
    component: FreeLessonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreeLessonsPageRoutingModule {}
