import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnitProgressPageRoutingModule } from './unit-progress-routing.module';

import { UnitProgressPage } from './unit-progress.page';
import { SharedModule } from 'src/app/components/shared.mobule';

import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NgxChartsModule,
    UnitProgressPageRoutingModule
  ],
  declarations: [UnitProgressPage]
})
export class UnitProgressPageModule {}
