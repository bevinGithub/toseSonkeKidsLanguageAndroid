import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestFlipLearnPageRoutingModule } from './guest-flip-learn-routing.module';

import { GuestFlipLearnPage } from './guest-flip-learn.page';
import { SharedModule } from 'src/app/components/shared.mobule';
import { GuestFlipLearnCardComponent } from 'src/app/components/guest-flip-learn-card/guest-flip-learn-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GuestFlipLearnPageRoutingModule
  ],
  declarations: [GuestFlipLearnPage, GuestFlipLearnCardComponent]
})
export class GuestFlipLearnPageModule {}
