import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestRhymesPlaylistPageRoutingModule } from './guest-rhymes-playlist-routing.module';

import { GuestRhymesPlaylistPage } from './guest-rhymes-playlist.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GuestRhymesPlaylistPageRoutingModule
  ],
  declarations: [GuestRhymesPlaylistPage]
})
export class GuestRhymesPlaylistPageModule {}
