import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsLoggedPageRoutingModule } from './terms-logged-routing.module';

import { TermsLoggedPage } from './terms-logged.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TermsLoggedPageRoutingModule
  ],
  declarations: [TermsLoggedPage]
})
export class TermsLoggedPageModule {}
