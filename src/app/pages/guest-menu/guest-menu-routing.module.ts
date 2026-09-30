import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestMenuPage } from './guest-menu.page';

const routes: Routes = [
  {
    path: '',
    component: GuestMenuPage,
    children: [
      {
        path: 'guest-dashboard',
        loadChildren: () => import('../guest-dashboard/guest-dashboard.module').then( m => m.GuestDashboardPageModule)
      },
      {
        path: 'guest-languages',
        loadChildren: () => import('../guest-languages/guest-languages.module').then( m => m.GuestLanguagesPageModule)
      },
      {
        path: 'guest-course-units',
        loadChildren: () => import('../guest-course-units/guest-course-units.module').then( m => m.GuestCourseUnitsPageModule)
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestMenuPageRoutingModule {}
