import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RhymesPlaylistPage } from './rhymes-playlist.page';

const routes: Routes = [
  {
    path: '',
    component: RhymesPlaylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RhymesPlaylistPageRoutingModule {}
