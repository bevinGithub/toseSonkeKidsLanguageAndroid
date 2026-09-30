import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestLessonsPage } from './guest-lessons.page';

const routes: Routes = [
  {
    path: '',
    component: GuestLessonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestLessonsPageRoutingModule {}
