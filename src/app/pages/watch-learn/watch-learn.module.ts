import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchLearnPageRoutingModule } from './watch-learn-routing.module';

import { WatchLearnPage } from './watch-learn.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    WatchLearnPageRoutingModule
  ],
  declarations: [WatchLearnPage]
})
export class WatchLearnPageModule {}
