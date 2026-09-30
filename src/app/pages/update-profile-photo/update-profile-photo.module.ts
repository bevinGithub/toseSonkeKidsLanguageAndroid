import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateProfilePhotoPageRoutingModule } from './update-profile-photo-routing.module';

import { UpdateProfilePhotoPage } from './update-profile-photo.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    UpdateProfilePhotoPageRoutingModule
  ],
  declarations: [UpdateProfilePhotoPage]
})
export class UpdateProfilePhotoPageModule {}
