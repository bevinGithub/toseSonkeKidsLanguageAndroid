import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlipLearnPageRoutingModule } from './flip-learn-routing.module';

import { FlipLearnPage } from './flip-learn.page';
import { SharedModule } from 'src/app/components/shared.mobule';
import { FlipLearnCardComponent } from 'src/app/components/flip-learn-card/flip-learn-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FlipLearnPageRoutingModule
  ],
  declarations: [FlipLearnPage, FlipLearnCardComponent]
})
export class FlipLearnPageModule {}
