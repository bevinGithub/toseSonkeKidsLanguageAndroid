import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreeUnitLessonsPageRoutingModule } from './free-unit-lessons-routing.module';

import { FreeUnitLessonsPage } from './free-unit-lessons.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FreeUnitLessonsPageRoutingModule
  ],
  declarations: [FreeUnitLessonsPage]
})
export class FreeUnitLessonsPageModule {}
