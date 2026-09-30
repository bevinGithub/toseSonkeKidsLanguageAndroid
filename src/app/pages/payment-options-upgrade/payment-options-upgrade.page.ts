import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-payment-options-upgrade',
  templateUrl: './payment-options-upgrade.page.html',
  styleUrls: ['./payment-options-upgrade.page.scss'],
  standalone: false,
})
export class PaymentOptionsUpgradePage implements OnInit {
planId: any;
  userId: any;
  userState: any;
  loggedUser: any;
  currentUser: any;
  paymentType: any;
  orderId: any;
  purchaseToken: any;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute
  ) {
    this.storageInit();
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.checkUserSubscriptionType();
   this.getCurrentUser();
  }


  async storageInit() {
    await this.storage.create();

  }

  async checkUserSubscriptionType() {
    this.loggedUser = await this.getUserSession();
    this.http.get(this.url + 'get-user-payment-type.php?userID=' + this.loggedUser?.id).subscribe({
      next: (res: any) => {
        this.userState = res;
        this.orderId = this.userState?.orderId;
        this.paymentType = res?.paymentSource;
        this.purchaseToken = this.userState?.purchaseToken
        console.log(this.userState);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  getUserSession() {
    this.currentUser = this.storage.get('currentUser');
    return this.currentUser;
  }

  async getCurrentUser() {
    await this.storage.get('currentUser').then((user: any) => {
      this.userId = user?.id;
      this.planId = this.activatedRoute.snapshot.paramMap.get('planID');
      console.log(this.userId + '==========' + this.planId);
    })
  }

  // getCurrentSubscription
  async paypalCheckout(user: any, plan: any) {
    console.log(user?.userID, plan?.planID);
    const userId = user?.userID;
    const planId = plan?.planID;
    // return await Browser.open({ url: this.url + 'paypal/index.php?planID=' + planId + '&userID=' + userId });
    console.log(`${this.url}paypal/update-sub-token.php?selectedPlanID=${planId}&userID=${userId}`);
    
    return await Browser.open({ url: `${this.url}paypal/update-sub-token.php?selectedPlanID=${planId}&userID=${userId}` });
  }

}
