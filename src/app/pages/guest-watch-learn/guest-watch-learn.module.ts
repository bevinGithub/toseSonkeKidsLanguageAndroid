import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestWatchLearnPageRoutingModule } from './guest-watch-learn-routing.module';

import { GuestWatchLearnPage } from './guest-watch-learn.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GuestWatchLearnPageRoutingModule
  ],
  declarations: [GuestWatchLearnPage]
})
export class GuestWatchLearnPageModule {}
