import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upgrade-subscription',
  templateUrl: './upgrade-subscription.page.html',
  styleUrls: ['./upgrade-subscription.page.scss'],
  standalone: false,
})
export class UpgradeSubscriptionPage implements OnInit {
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
}
