import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-paypal-subscription',
  templateUrl: './paypal-subscription.page.html',
  styleUrls: ['./paypal-subscription.page.scss'],
  standalone: false,
})
export class PaypalSubscriptionPage implements OnInit {
  plans: any;
  planID: any;
  planName: any;

  paypal: any = {};
  user: any;

  url = environment.url;
  constructor(
    private http:HttpClient,
    private storage: Storage,

  ) {
    this.storageInit();
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
   this.getCurrentUser();
   this.getPlans();
  }

  getCurrentUser() {
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
       this.user = user;
        this.paypal.userID = this.user?.id;
    });
  }

  async storageInit() {
    await this.storage.create();
  }

  getPlans() {
    this.http.get(this.url + 'get-paypal-plans.php').subscribe({
      next: (res: any) => {
        console.log(res);
        this.plans = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  async paypalCheckout() {
    console.log(this.paypal);
    const userId = this.paypal?.userID;
    const planId = this.paypal?.planID;
    return await Browser.open({ url: this.url + 'paypal/index.php?planID=' + planId + '&userID=' + userId });
  }

}
