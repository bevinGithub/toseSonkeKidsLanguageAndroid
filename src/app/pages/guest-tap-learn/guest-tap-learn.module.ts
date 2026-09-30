import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestTapLearnPageRoutingModule } from './guest-tap-learn-routing.module';

import { GuestTapLearnPage } from './guest-tap-learn.page';
import { SharedModule } from 'src/app/components/shared.mobule';
import { GuestFlipcardComponent } from 'src/app/components/guest-flipcard/guest-flipcard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GuestTapLearnPageRoutingModule
  ],
  declarations: [GuestTapLearnPage, GuestFlipcardComponent]
})
export class GuestTapLearnPageModule {}
