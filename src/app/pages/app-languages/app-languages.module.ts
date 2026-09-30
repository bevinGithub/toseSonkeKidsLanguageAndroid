import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppLanguagesPageRoutingModule } from './app-languages-routing.module';

import { AppLanguagesPage } from './app-languages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppLanguagesPageRoutingModule
  ],
  declarations: [AppLanguagesPage]
})
export class AppLanguagesPageModule {}
