import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpgradeOptionsPageRoutingModule } from './upgrade-options-routing.module';

import { UpgradeOptionsPage } from './upgrade-options.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    UpgradeOptionsPageRoutingModule
  ],
  declarations: [UpgradeOptionsPage]
})
export class UpgradeOptionsPageModule {}
