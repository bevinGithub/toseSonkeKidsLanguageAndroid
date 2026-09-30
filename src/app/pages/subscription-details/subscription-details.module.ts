import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriptionDetailsPageRoutingModule } from './subscription-details-routing.module';

import { SubscriptionDetailsPage } from './subscription-details.page';
import { SharedModule } from 'src/app/components/shared.mobule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SubscriptionDetailsPageRoutingModule
  ],
  declarations: [SubscriptionDetailsPage]
})
export class SubscriptionDetailsPageModule {}
