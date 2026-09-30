import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

import { Browser } from '@capacitor/browser';
import { Router } from '@angular/router';
import { NetworkStatusService } from 'src/app/services/network-status.service';

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.page.html',
  styleUrls: ['./subscription-details.page.scss'],
  standalone: false,
})
export class SubscriptionDetailsPage implements OnInit {
  user: any;
  members: any;
  subscribed: any;
  remaining: any;
  status: any;
  connection: any;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private networkStatusService: NetworkStatusService
  ) {
    this.storageInit();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getUserData();
  }
  async storageInit() {
    await this.storage.create();
  }

  getUserData() {
    console.log('Current User');
    this.storage.get('currentUser').then((user: any) => {
      const userId = user?.id;
      this.getCurrentUser(userId);
    });
  }

  async getCurrentUser(userID: any) {
    const loading = await this.loadingController.create({
      message: 'Please wait..',
    });
    loading.present();
    console.log(userID);
    //CHECK CONNECTION
    const onlineStatus = await this.networkStatusService.getNetworkConnection();
    this.connection = onlineStatus.connected;
    //OFFLINE DATA
    if (!this.connection) {
      loading.dismiss();
      await this.getCurrentUserOffline();
      return;
    }
    this.http
      .get(this.url + 'get-current-user-members.php?userID=' + userID)
      .subscribe({
        next: (user: any) => {
          this.storage.set('userData', user);
          this.user = user?.currentUser;
          this.members = user?.members;
          this.remaining = user?.remaining;
          console.log(user);
          loading.dismiss();
        },
        error: (err: any) => {
          console.log(err);
          loading.dismiss();
        },
      });
  }

  async getCurrentUserOffline() {
    try {
      const user: any = await this.storage.get('userData');
      this.user = user?.currentUser;
      this.members = user?.members;
      this.remaining = user?.remaining;
      console.log('Offline Current User Info: ', user);
    } catch (error) {
      console.log('Error fetching offline user:', error);
    }
  }

  async removeMember(userId: any) {
    console.log(userId);
    const memberID = userId?.memberID;

    const alert = await this.alertController.create({
      header: 'Remove Member',
      message: 'Are you sure you want to delete this member?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah' + memberID);
          },
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay' + memberID);
            this.memberRemoval(memberID);
          },
        },
      ],
    });
    await alert.present();
  }

  memberRemoval(memberID: any) {
    console.log(memberID, this.user?.id);
    this.http
      .get(
        this.url +
          'process-member-removal.php?parentID=' +
          this.user?.id +
          '&memberID=' +
          memberID
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if (res === 'success') {
            this.flashMsg('Member successfully removed!');
            this.getUserData();
          }
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  async flashMsg(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  async cancellationPayPalAlertConfirm(data: any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to cancel your subscription?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            console.log(data);
            this.cancelPayPalSubscription(data);
          },
        },
      ],
    });

    await alert.present();
  }

  async cancelPayPalSubscription(user: any) {
    console.log(user?.userId);
    await Browser.open({
      url: `${this.url}paypal/cancel-token.php?userID=${user.userId}`,
    });
  }

  async changeSubscriptionAlertConfirm(data: any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to change your subscription plan?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm No');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.upgradeDowngradeSubscription(data);
          },
        },
      ],
    });

    await alert.present();
  }

  async cancellationGoogleAlertConfirm(data: any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to cancel your subscription?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            console.log(data);
            this.cancelGoogleSubscription();
          },
        },
      ],
    });

    await alert.present();
  }

  async cancelGoogleSubscription() {
    console.log(this.user);
    this.http
      .get(
        this.url + 'deactivate-google-subscription.php?userID=' + this.user?.id
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.status = res;
          if (this.status?.status === 'success') {
            console.log('Subscription Cancelled!');
            this.GooglePlayPage();
            this.router.navigate(['/user-menu/user-dashboard']);
          }
          if (this.status?.status === 'error') {
            console.log('Subscription Cancellation Failed!');
          }
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  async GooglePlayPage() {
    const sku = this.user?.product_id;
    return await Browser.open({
      url: `https://play.google.com/store/account/subscriptions?sku=${sku}&package=com.tosesonke`,
    });
  }

  upgradeDowngradeSubscription(user: any) {
    console.log(user?.userId);
    this.router.navigate(['/upgrade-options']);
  }

  async deleteAccountAlertConfirm(data: any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete your account?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            console.log(data);
            this.deleteAccount(data);
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteAccount(user: any) {
    console.log(user?.userId);
    this.http
      .get(this.url + 'delete-account.php?userID=' + user?.userId)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.status = res;
          console.log(this.status);
          if (this.status?.status === 'Account Deleted') {
            this.flashMsg('Account has been successfully deleted!');
            this.storage.clear();
            this.router.navigate(['/welcome']);
          }
          if (this.status.status === 'Subscription Active') {
            this.noticeAlertConfirm(
              'To delete your account please cancel your active subscription first!'
            );
          }
          if (this.status.status === 'Error Deleting') {
            this.flashMsg('There was an error deleting account!');
          }
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  async noticeAlertConfirm(msg: any) {
    const alert = await this.alertController.create({
      header: 'User Confirm!',
      message: msg,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }
}
