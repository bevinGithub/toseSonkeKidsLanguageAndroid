import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-upgrade-options',
  templateUrl: './upgrade-options.page.html',
  styleUrls: ['./upgrade-options.page.scss'],
  standalone: false,
})
export class UpgradeOptionsPage implements OnInit {
  user: any;
  plans: any;
  freePlan: any;

  standardPlanMon: any;
  standardPlanYr: any;

  familyDuoPlanMon: any;
  familyDuoPlanYr: any;

  familyGroupPlanMon: any;
  familyGroupPlanYr: any;


  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
  ) {
    this.storageInit();
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getCurrentUser();
    this.getActivePlans();
  }

  async storageInit() {
    await this.storage.create();
  }

  getCurrentUser() {
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.user = user;
    });
  }

  getActivePlans() {
    this.http.get(`${this.url}get-paypal-active-plans.php`).subscribe((res: any) => {
      this.plans = res;
      console.log(this.plans?.[1]);
      this.freePlan = this.plans?.[0]?.freeTrial;
      this.standardPlanMon = this.plans?.[1]?.standardMon;
      this.standardPlanYr = this.plans?.[2]?.standardYr;
      this.familyDuoPlanMon = this.plans?.[3]?.familyDuoMon;
      this.familyDuoPlanYr = this.plans?.[4]?.familyDuoYr;
      this.familyGroupPlanMon = this.plans?.[5]?.familyGroupMon;
      this.familyGroupPlanYr = this.plans?.[6]?.familyGroupYr;
    });
  }

  async changeSubsciptionPlan(data: any) {
    console.log('++++++++++++++++++++++++');
    console.log(this.user?.id);
    console.log(data);
    console.log('++++++++++++++++++++++++');
    const selectedPlanID=data?.planID;
    // await Browser.open({ url: `${this.url}paypal/update-sub-token.php?selectedPlanID=${selectedPlanID}&userID=${this.user?.id}` });
     this.router.navigate([`/payment-options-upgrade/${selectedPlanID}`]);
  }

}
