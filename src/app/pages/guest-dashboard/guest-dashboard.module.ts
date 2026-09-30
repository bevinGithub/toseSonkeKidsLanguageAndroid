import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestDashboardPageRoutingModule } from './guest-dashboard-routing.module';

import { GuestDashboardPage } from './guest-dashboard.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GuestDashboardPageRoutingModule
  ],
  declarations: [GuestDashboardPage]
})
export class GuestDashboardPageModule {}
