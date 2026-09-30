import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLanguagesPage } from './app-languages.page';

const routes: Routes = [
  {
    path: '',
    component: AppLanguagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppLanguagesPageRoutingModule {}
