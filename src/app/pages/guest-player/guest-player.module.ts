import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestPlayerPageRoutingModule } from './guest-player-routing.module';

import { GuestPlayerPage } from './guest-player.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GuestPlayerPageRoutingModule
  ],
  declarations: [GuestPlayerPage]
})
export class GuestPlayerPageModule {}
