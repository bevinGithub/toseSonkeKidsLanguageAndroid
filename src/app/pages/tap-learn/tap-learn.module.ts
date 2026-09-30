import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TapLearnPageRoutingModule } from './tap-learn-routing.module';

import { TapLearnPage } from './tap-learn.page';
import { SharedModule } from 'src/app/components/shared.mobule';
import { FlipcardComponent } from 'src/app/components/flipcard/flipcard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TapLearnPageRoutingModule
  ],
  declarations: [TapLearnPage, FlipcardComponent]
})
export class TapLearnPageModule {}
