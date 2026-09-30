import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { CapgoAuthService } from 'src/app/services/capgo-auth.service';
import { CapgoFacbookAuthService } from 'src/app/services/capgo-facbook-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
  standalone: false,
})
export class EntryPage implements OnInit {
  googleUser: any;
  gProfile: any;
  fbProfile: any;
  facebookUser: any;
  facebook: any;
  dataUser: any;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private capgoAuthService: CapgoAuthService,
    private capGoFacebookAuth: CapgoFacbookAuthService,
  ) {
    this.storageInit();
  }

  ngOnInit() {
    this.capgoAuthService.initializeAuth();
  }

  async storageInit() {
    await this.storage.create();
  }

   //GOOGLE LOGIN
   async googleLogin() {
    this.dataUser = await this.capgoAuthService.capGoGoogleSignIn();
    const user = this.dataUser?.result;
    const token = user?.accessToken;
    const userResp = user?.profile;
    this.googleUser = {
      id: userResp?.id,
      name: userResp?.name,
      email: userResp?.email,
      familyName: userResp?.familyName,
      givenName: userResp?.givenName,
      imageUrl: userResp?.imageUrl,
      token: token?.token,
      source: 'Google',
    };
    console.log(this.googleUser);
    if (token !== '') {
      const loading = await this.loadingController.create({
        message: 'Please  wait...',
        duration: 2000,
        spinner: 'bubbles',
      });
      await loading.present();
      this.http.post(this.url + 'google-register-login.php', this.googleUser).subscribe({
        next: (res: any) => {
          console.log(res);
          this.gProfile = res;
          if (this.gProfile?.status === 'success') {
            this.storage.set('currentUser', this.gProfile?.user);
            loading.dismiss();
            this.flashNotice('User successfully logged in!');
            this.router.navigate(['/user-menu/user-dashboard']);
          } else if (this.gProfile?.status === 'registered') {
            this.storage.set('currentUser', this.gProfile?.user);
            loading.dismiss();
            this.flashNotice('User successfully logged in!');
            this.router.navigate(['/user-menu/user-dashboard']);
          } else {
            loading.dismiss();
            this.flashNotice('There was an error, please try again!');
          }
        },
        error: (err: any) => {
          console.log(err);
          loading.dismiss();
          this.flashNotice(
            'There was an error, please try again: ' + JSON.stringify(err)
          );
        },
      });
    } else {
      this.flashNotice('There was an error, please try again!');
    }
  }

  async facebookLogin() {
    this.facebookUser = await this.capGoFacebookAuth.capGoFacebookSignIn();
    const facebookProfile = this.facebookUser?.result;
    this.facebook = facebookProfile?.profile;

    this.facebookUser = {
      id: this.facebook?.userID,
      facebookFullName: this.facebook?.name,
      email: this.facebook?.email,
      imageUrl: this.facebook?.imageURL,
      source: 'Facebook',
    };

    console.log(this.facebookUser);
    const loading = await this.loadingController.create({
      message: 'Please  wait...',
      duration: 2000,
      spinner: 'bubbles',
    });
    await loading.present();

    this.http.post(this.url + 'facebook-register-login.php', this.facebookUser).subscribe({
      next: (res: any) => {
        console.log(res);
        this.fbProfile = res;
        if (this.fbProfile?.status === 'success') {
          this.storage.set('currentUser', this.fbProfile?.user);
          loading.dismiss();
          this.flashNotice("User successfully logged in!");
          this.router.navigate(['/user-menu/user-dashboard']);
        } else if (this.fbProfile?.status === 'registered') {
          this.storage.set('currentUser', this.fbProfile?.user);
          loading.dismiss();
          this.flashNotice("User successfully logged in!");
          this.router.navigate(['/user-menu/user-dashboard']);
        } else {
          loading.dismiss();
          this.flashNotice("There was an error, please try again!");
        }
      },
      error: (err: any) => {
        loading.dismiss();
        this.flashNotice("There was an error, please try again: " + JSON.stringify(err));
      }
    })
  }

  async appleLogin() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Apple Login Here',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async flashNotice(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
