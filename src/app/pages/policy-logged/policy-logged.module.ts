import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyLoggedPageRoutingModule } from './policy-logged-routing.module';

import { PolicyLoggedPage } from './policy-logged.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PolicyLoggedPageRoutingModule
  ],
  declarations: [PolicyLoggedPage]
})
export class PolicyLoggedPageModule {}
