import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscribeRegistrationPageRoutingModule } from './subscribe-registration-routing.module';

import { SubscribeRegistrationPage } from './subscribe-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscribeRegistrationPageRoutingModule
  ],
  declarations: [SubscribeRegistrationPage]
})
export class SubscribeRegistrationPageModule {}
