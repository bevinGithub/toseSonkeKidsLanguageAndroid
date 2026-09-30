import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMemberPageRoutingModule } from './add-member-routing.module';

import { AddMemberPage } from './add-member.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AddMemberPageRoutingModule
  ],
  declarations: [AddMemberPage]
})
export class AddMemberPageModule {}
