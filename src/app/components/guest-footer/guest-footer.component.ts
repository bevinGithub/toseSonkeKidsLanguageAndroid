import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonButton, IonFooter } from '@ionic/angular/standalone';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';

@Component({
  selector: 'app-guest-footer',
  templateUrl: './guest-footer.component.html',
  styleUrls: ['./guest-footer.component.scss'],
  imports: [IonButton],
})
export class GuestFooterComponent implements OnInit {
  screenTitle: string = '';
  trackPage: string = '';
  constructor(
    private router: Router,
    private alertController: AlertController,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    //this.googleAnalyticsTracking();
  }

  googleAnalyticsTracking() {
    const currentUrl = this.router.url;
    const checkUrl = currentUrl.split('/');
    if (checkUrl.includes('user-menu')) {
      this.screenTitle =
        checkUrl[2].charAt(0).toUpperCase() +
        checkUrl[2].substring(1).replace('-', ' ');
    } else {
      if (currentUrl.split('?').length > 1) {
        const subLink = currentUrl.split('?')[0].replace('/', '');
        this.screenTitle =
          subLink.toUpperCase().charAt(0) +
          subLink.substring(1).replace('-', ' ');
      } else {
        const singlePage = checkUrl[1].replace('-', ' ');
        this.screenTitle =
          singlePage.charAt(0).toUpperCase() + singlePage.substring(1);
      }
    }
    console.log('Page Title: ', this.toTitleCase(this.screenTitle));
    this.trackPage = this.toTitleCase(this.screenTitle) + ' Screen';
    console.log('Track Page: ', this.trackPage);
    this.googleAnalyticsService.setScreenName(this.trackPage);
  }

  toTitleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  subscribeGuestUser() {
    console.log('Guest user subscribed to the newsletter.');
  }

  async subscriptionAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to subscribe?',
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
            console.log('Confirm Okay');
            this.redirectSignIn();
          },
        },
      ],
    });

    await alert.present();
  }

  redirectSignIn() {
    this.router.navigate(['/subscribe-registration']);
  }
}
