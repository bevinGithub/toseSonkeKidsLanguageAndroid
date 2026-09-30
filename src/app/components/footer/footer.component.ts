import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { CapgoAuthService } from 'src/app/services/capgo-auth.service';
import { CapgoFacbookAuthService } from 'src/app/services/capgo-facbook-auth.service';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  url = environment.url;
  screenTitle: string = '';
  trackPage: string = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private capgoAuthService: CapgoAuthService,
    private capgoFacebookAuthService: CapgoFacbookAuthService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.storageInit();
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

  async storageInit() {
    return this.storage.create();
  }

  home() {
    this.router.navigate(['/user-menu/user-dashboard']);
  }

  courseUnits() {
    this.router.navigate(['/user-menu/course-units']);
  }

  userProfile() {
    this.router.navigate(['/user-menu/profile']);
  }

  userLogout() {
    this.storage.get('currentUser').then((data: any) => {
      const logData = { userID: data.id };
      this.http
        .post(this.url + 'last-login.php', logData)
        .subscribe((resp: any) => {
          console.log(resp);
        });
    });
    this.storage.clear();
    this.presentToast('User successfully logged out!');
    this.capgoAuthService.googleLogout();
    this.capgoFacebookAuthService.capgoFacebookSignout();
    this.router.navigate(['/signin']);
  }

  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
