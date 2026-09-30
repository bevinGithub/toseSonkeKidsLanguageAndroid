import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateProfilePhotoPage } from './update-profile-photo.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateProfilePhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateProfilePhotoPageRoutingModule {}
