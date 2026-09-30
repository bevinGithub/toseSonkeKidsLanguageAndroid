import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RhymesPlaylistPageRoutingModule } from './rhymes-playlist-routing.module';

import { RhymesPlaylistPage } from './rhymes-playlist.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RhymesPlaylistPageRoutingModule
  ],
  declarations: [RhymesPlaylistPage]
})
export class RhymesPlaylistPageModule {}
