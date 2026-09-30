import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PracticeTimePage } from './practice-time.page';

const routes: Routes = [
  {
    path: '',
    component: PracticeTimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticeTimePageRoutingModule {}
