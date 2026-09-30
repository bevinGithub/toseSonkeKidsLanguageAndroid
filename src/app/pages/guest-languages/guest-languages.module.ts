import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestLanguagesPageRoutingModule } from './guest-languages-routing.module';

import { GuestLanguagesPage } from './guest-languages.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GuestLanguagesPageRoutingModule
  ],
  declarations: [GuestLanguagesPage]
})
export class GuestLanguagesPageModule {}
