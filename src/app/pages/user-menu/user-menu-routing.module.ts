import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserMenuPage } from './user-menu.page';

const routes: Routes = [
  {
    path: '',
    component: UserMenuPage,
    children: [
      {
        path: 'user-dashboard',
        loadChildren: () => import('../user-dashboard/user-dashboard.module').then( m => m.UserDashboardPageModule)
      },
      {
        path: 'course-units',
        loadChildren: () => import('../course-units/course-units.module').then( m => m.CourseUnitsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'subscriptions',
        loadChildren: () => import('../subscriptions/subscriptions.module').then( m => m.SubscriptionsPageModule)
        },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'contact-us',
        loadChildren: () => import('../contact-us/contact-us.module').then( m => m.ContactUsPageModule)
      },
      {
        path: 'delete-account',
        loadChildren: () => import('../delete-account/delete-account.module').then( m => m.DeleteAccountPageModule)
      },
      {
        path: 'plans',
        loadChildren: () => import('../plans/plans.module').then( m => m.PlansPageModule)
      },
      {
        path: 'languages',
        loadChildren: () => import('../languages/languages.module').then( m => m.LanguagesPageModule)
      },
        {
          path: 'vocabulary-bank',
          loadChildren: () => import('../vocabulary-bank/vocabulary-bank.module').then( m => m.VocabularyBankPageModule)
        },
    ],
  },
  {
    path: 'menu',
    redirectTo: 'menu/user-dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserMenuPageRoutingModule {}
