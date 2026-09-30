import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestSigninPageRoutingModule } from './guest-signin-routing.module';

import { GuestSigninPage } from './guest-signin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestSigninPageRoutingModule
  ],
  declarations: [GuestSigninPage]
})
export class GuestSigninPageModule {}
