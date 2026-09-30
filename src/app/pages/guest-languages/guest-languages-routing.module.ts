import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestLanguagesPage } from './guest-languages.page';

const routes: Routes = [
  {
    path: '',
    component: GuestLanguagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestLanguagesPageRoutingModule {}
