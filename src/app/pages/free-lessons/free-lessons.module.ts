import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreeLessonsPageRoutingModule } from './free-lessons-routing.module';

import { FreeLessonsPage } from './free-lessons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreeLessonsPageRoutingModule
  ],
  declarations: [FreeLessonsPage]
})
export class FreeLessonsPageModule {}
