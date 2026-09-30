import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.page.html',
  styleUrls: ['./payment-options.page.scss'],
  standalone: false,
})
export class PaymentOptionsPage implements OnInit {
  planId: any;
  userId: any;
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
   this.getCurrentUser();
  }

  async storageInit() {
    await this.storage.create();
  }

  async getCurrentUser() {
    await this.storage.get('currentUser').then((user: any) => {
      this.userId = user?.id;
      this.planId = this.activatedRoute.snapshot.paramMap.get('planID');
      console.log(this.userId);
    })
  }

  async paypalCheckout(user: any, plan: any) {
    console.log(user?.userID, plan?.planID);
    const userId = user?.userID;
    const planId = plan?.planID;
    return await Browser.open({ url: this.url + 'paypal/index.php?planID=' + planId + '&userID=' + userId });
  }

}
