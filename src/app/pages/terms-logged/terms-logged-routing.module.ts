import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsLoggedPage } from './terms-logged.page';

const routes: Routes = [
  {
    path: '',
    component: TermsLoggedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsLoggedPageRoutingModule {}
