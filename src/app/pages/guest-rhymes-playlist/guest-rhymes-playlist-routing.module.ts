import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestRhymesPlaylistPage } from './guest-rhymes-playlist.page';

const routes: Routes = [
  {
    path: '',
    component: GuestRhymesPlaylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRhymesPlaylistPageRoutingModule {}
