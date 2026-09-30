import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionStatusService {
  subscription: any;
  subscriptionStatus: any;
  subscriptionActive: boolean = false;
  subscriptionExpired: boolean = false;

  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
  ) {
    this.storageInit();
  }

  async storageInit() {
    await this.storage.create();
  }

  async getCurrentUser() {
    return await this.storage.get('currentUser');
  }

  async checkUserSubscriptionStatus(userId: string) {
    let response = new BehaviorSubject({});
    this.http.get(this.url + 'subscription-status-check.php?userID=' + userId).subscribe({
      next: (data: any) => {
        this.subscription = data;
        response.next(this.subscription);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
    console.log(response);
    return response;
  }

}
