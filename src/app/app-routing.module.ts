import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'entry',
    loadChildren: () => import('./pages/entry/entry.module').then( m => m.EntryPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'activate-user',
    loadChildren: () => import('./pages/activate-user/activate-user.module').then( m => m.ActivateUserPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'forgot-password-confirmation',
    loadChildren: () => import('./pages/forgot-password-confirmation/forgot-password-confirmation.module').then( m => m.ForgotPasswordConfirmationPageModule)
  },
  {
    path: 'user-menu',
    loadChildren: () => import('./pages/user-menu/user-menu.module').then( m => m.UserMenuPageModule)
  },
  {
    path: 'reset-password/:userID',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then( m => m.PlayerPageModule)
  },
  {
    path: 'edit-user/:userID',
    loadChildren: () => import('./pages/edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'update-profile-photo/:userID',
    loadChildren: () => import('./pages/update-profile-photo/update-profile-photo.module').then( m => m.UpdateProfilePhotoPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'policy',
    loadChildren: () => import('./pages/policy/policy.module').then( m => m.PolicyPageModule)
  },
  {
    path: 'policy-logged',
    loadChildren: () => import('./pages/policy-logged/policy-logged.module').then( m => m.PolicyLoggedPageModule)
  },
  {
    path: 'terms-logged',
    loadChildren: () => import('./pages/terms-logged/terms-logged.module').then( m => m.TermsLoggedPageModule)
  },
  {
    path: 'unit-video',
    loadChildren: () => import('./pages/unit-video/unit-video.module').then( m => m.UnitVideoPageModule)
  },
  {
    path: 'unit-progress/:unitID',
    loadChildren: () => import('./pages/unit-progress/unit-progress.module').then( m => m.UnitProgressPageModule)
  },
  {
    path: 'tap-learn/:unitID',
    loadChildren: () => import('./pages/tap-learn/tap-learn.module').then( m => m.TapLearnPageModule)
  },
  {
    path: 'paypal-subscription',
    loadChildren: () => import('./pages/paypal-subscription/paypal-subscription.module').then( m => m.PaypalSubscriptionPageModule)
  },
  {
    path: 'google-pay-subscription/:productID',
    loadChildren: () => import('./pages/google-pay-subscription/google-pay-subscription.module').then( m => m.GooglePaySubscriptionPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'free-lessons',
    loadChildren: () => import('./pages/free-lessons/free-lessons.module').then( m => m.FreeLessonsPageModule)
  },
  {
    path: 'guest-signin',
    loadChildren: () => import('./pages/guest-signin/guest-signin.module').then( m => m.GuestSigninPageModule)
  },
  {
    path: 'guest-dashboard',
    loadChildren: () => import('./pages/guest-dashboard/guest-dashboard.module').then( m => m.GuestDashboardPageModule)
  },
  {
    path: 'guest-lessons',
    loadChildren: () => import('./pages/guest-lessons/guest-lessons.module').then( m => m.GuestLessonsPageModule)
  },
  {
    path: 'guest-player',
    loadChildren: () => import('./pages/guest-player/guest-player.module').then( m => m.GuestPlayerPageModule)
  },
  {
    path: 'guest-course-units',
    loadChildren: () => import('./pages/guest-course-units/guest-course-units.module').then( m => m.GuestCourseUnitsPageModule)
  },
  {
    path: 'guest-unit-lessons/:unitID',
    loadChildren: () => import('./pages/guest-unit-lessons/guest-unit-lessons.module').then( m => m.GuestUnitLessonsPageModule)
  },
  {
    path: 'guest-unit-video',
    loadChildren: () => import('./pages/guest-unit-video/guest-unit-video.module').then( m => m.GuestUnitVideoPageModule)
  },
  {
    path: 'guest-lesson-video',
    loadChildren: () => import('./pages/guest-lesson-video/guest-lesson-video.module').then( m => m.GuestLessonVideoPageModule)
  },
  {
    path: 'guest-tap-learn/:unitID',
    loadChildren: () => import('./pages/guest-tap-learn/guest-tap-learn.module').then( m => m.GuestTapLearnPageModule)
  },
  {
    path: 'subscribe-registration',
    loadChildren: () => import('./pages/subscribe-registration/subscribe-registration.module').then( m => m.SubscribeRegistrationPageModule)
  },
  {
    path: 'payment-options/:planID',
    loadChildren: () => import('./pages/payment-options/payment-options.module').then( m => m.PaymentOptionsPageModule)
  },
  {
    path: 'subscription-details',
    loadChildren: () => import('./pages/subscription-details/subscription-details.module').then( m => m.SubscriptionDetailsPageModule)
  },
  {
    path: 'add-member',
    loadChildren: () => import('./pages/add-member/add-member.module').then( m => m.AddMemberPageModule)
  },
  {
    path: 'upgrade-subscription',
    loadChildren: () => import('./pages/upgrade-subscription/upgrade-subscription.module').then( m => m.UpgradeSubscriptionPageModule)
  },
  {
    path: 'guest-languages',
    loadChildren: () => import('./pages/guest-languages/guest-languages.module').then( m => m.GuestLanguagesPageModule)
  },
  {
    path: 'upgrade-options',
    loadChildren: () => import('./pages/upgrade-options/upgrade-options.module').then( m => m.UpgradeOptionsPageModule)
  },
  {
    path: 'guest-menu',
    loadChildren: () => import('./pages/guest-menu/guest-menu.module').then( m => m.GuestMenuPageModule)
  },
  {
    path: 'free-unit-lessons/:unitID',
    loadChildren: () => import('./pages/free-unit-lessons/free-unit-lessons.module').then( m => m.FreeUnitLessonsPageModule)
  },
  {
    path: 'payment-success',
    loadChildren: () => import('./pages/payment-success/payment-success.module').then( m => m.PaymentSuccessPageModule)
  },
  {
    path: 'payment-failed',
    loadChildren: () => import('./pages/payment-failed/payment-failed.module').then( m => m.PaymentFailedPageModule)
  },
  {
    path: 'payment-cancelled',
    loadChildren: () => import('./pages/payment-cancelled/payment-cancelled.module').then( m => m.PaymentCancelledPageModule)
  },
  {
    path: 'upgrade-success',
    loadChildren: () => import('./pages/upgrade-success/upgrade-success.module').then( m => m.UpgradeSuccessPageModule)
  },
  {
    path: 'cancel-subscription',
    loadChildren: () => import('./pages/cancel-subscription/cancel-subscription.module').then( m => m.CancelSubscriptionPageModule)
  },
  {
    path: 'course-unit-details/:unitID',
    loadChildren: () => import('./pages/course-unit-details/course-unit-details.module').then( m => m.CourseUnitDetailsPageModule)
  },
  {
    path: 'watch-learn/:unitID',
    loadChildren: () => import('./pages/watch-learn/watch-learn.module').then( m => m.WatchLearnPageModule)
  },
  {
    path: 'sing-learn/:unitID',
    loadChildren: () => import('./pages/sing-learn/sing-learn.module').then( m => m.SingLearnPageModule)
  },
  {
    path: 'practice-time/:unitID',
    loadChildren: () => import('./pages/practice-time/practice-time.module').then( m => m.PracticeTimePageModule)
  },
  {
    path: 'rhymes-playlist/:unitID',
    loadChildren: () => import('./pages/rhymes-playlist/rhymes-playlist.module').then( m => m.RhymesPlaylistPageModule)
  },
  {
    path: 'flip-learn/:unitID',
    loadChildren: () => import('./pages/flip-learn/flip-learn.module').then( m => m.FlipLearnPageModule)
  },
  {
    path: 'free-unit-details/:unitID',
    loadChildren: () => import('./pages/free-unit-details/free-unit-details.module').then( m => m.FreeUnitDetailsPageModule)
  },
  {
    path: 'guest-unit-details/:unitID',
    loadChildren: () => import('./pages/guest-unit-details/guest-unit-details.module').then( m => m.GuestUnitDetailsPageModule)
  },
  {
    path: 'guest-flip-learn/:unitID',
    loadChildren: () => import('./pages/guest-flip-learn/guest-flip-learn.module').then( m => m.GuestFlipLearnPageModule)
  },
  {
    path: 'guest-watch-learn/:unitID',
    loadChildren: () => import('./pages/guest-watch-learn/guest-watch-learn.module').then( m => m.GuestWatchLearnPageModule)
  },
  {
    path: 'guest-sing-learn/:unitID',
    loadChildren: () => import('./pages/guest-sing-learn/guest-sing-learn.module').then( m => m.GuestSingLearnPageModule)
  },
  {
    path: 'guest-practice-time/:unitID',
    loadChildren: () => import('./pages/guest-practice-time/guest-practice-time.module').then( m => m.GuestPracticeTimePageModule)
  },
  {
    path: 'guest-rhymes-playlist/:unitID',
    loadChildren: () => import('./pages/guest-rhymes-playlist/guest-rhymes-playlist.module').then( m => m.GuestRhymesPlaylistPageModule)
  },
  {
    path: 'payment-options-upgrade/:planID',
    loadChildren: () => import('./pages/payment-options-upgrade/payment-options-upgrade.module').then( m => m.PaymentOptionsUpgradePageModule)
  },
  {
    path: 'google-pay-upgrade/:productID',
    loadChildren: () => import('./pages/google-pay-upgrade/google-pay-upgrade.module').then( m => m.GooglePayUpgradePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
