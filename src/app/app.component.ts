import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import OneSignal from 'onesignal-cordova-plugin';
import { AlertController } from '@ionic/angular';
import { App, URLOpenListenerEvent } from '@capacitor/app';

import { register } from 'swiper/element/bundle';
import { GoogleAnalyticsService } from './services/google-analytics.service';
import { NetworkStatusService } from './services/network-status.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  currentGuesttUser: any;
  loggedGuest: any;
  currentUser: any;
  loggedUser: any;
  path: any;
  notificationReceived: any;
  notificationData: any;

  constructor(
    private zone: NgZone,
    private router: Router,
    private storage: Storage,
    private alertController: AlertController,
    private googleAnalyticsService: GoogleAnalyticsService,
    private networkService: NetworkStatusService
  ) {
    this.storageInit();
    this.initializeApp();
  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        const domain = 'tose-sonkekids.com';
        // https://tose-sonkekids.com/transaction-success
        const pathArray = event.url.split(domain);
        // ['https://tose-sonkekids.com', '/transaction-success']
        const appPath = pathArray.pop();
        if (appPath) {
          this.router.navigateByUrl(appPath);
        }
      });
    });
    this.checkUserState();
    // this.OneSignalInit();
  }

  async checkUserState() {
    this.loggedUser = await this.getUserSession();
    console.log('Logged User:', this.loggedUser?.isGuest);
    if (this.loggedUser?.isGuest === 'guest') {
      this.router.navigate(['/guest-dashboard']);
    } else if (this.loggedUser?.isGuest === 'user') {
      this.router.navigate(['/landing']);
    } else {
      this.router.navigate(['/welcome']);
    }
  }

  async storageInit() {
    await this.storage.create();
  }

  getUserSession() {
    this.currentUser = this.storage.get('currentUser');
    return this.currentUser;
  }

  OneSignalInit() {
    OneSignal.Debug.setLogLevel(6);
    OneSignal.initialize('5756bd6c-5d39-4623-b4fb-050e70b027c6');

    const myClickListener = async (event: any) => {
      this.notificationReceived = event;
      console.log(this.notificationReceived.notification);
      this.notificationData = this.notificationReceived.notification;
      const title = this.notificationData?.title;
      const msg = this.notificationData?.body;
      const task = this.notificationData?.additionalData;

      this.openNotification(title, msg, task);
    };
    OneSignal.Notifications.addEventListener('click', myClickListener);
    OneSignal.Notifications.requestPermission(true).then(
      (accepted: boolean) => {
        console.log('User accepted notifications: ' + accepted);
      }
    );
  }

  async openNotification(title: any, msg: string, task: any) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Ok ',
          handler: () => {
            console.log('Confirm Okay');
            this.openPage(task);
          },
        },
      ],
    });
    await alert.present();
  }

  openPage(data: any) {
    console.log(data);
    this.zone.run(() => {
      this.router.navigate(['/' + data?.controller]);
    });
  }
}
