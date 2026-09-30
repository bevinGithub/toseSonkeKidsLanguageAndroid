import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestPracticeTimePage } from './guest-practice-time.page';

const routes: Routes = [
  {
    path: '',
    component: GuestPracticeTimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestPracticeTimePageRoutingModule {}
