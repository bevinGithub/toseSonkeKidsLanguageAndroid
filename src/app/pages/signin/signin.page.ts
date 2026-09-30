import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { CapgoAuthService } from 'src/app/services/capgo-auth.service';
import { NetworkStatusService } from 'src/app/services/network-status.service';
import { CapgoFacbookAuthService } from 'src/app/services/capgo-facbook-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: false,
})
export class SigninPage implements OnInit {
  //CUSTOM LOGIN
  user: any = {};
  state: any;
  showPass: any;
  type: any;

  validEmail: boolean = false;

  //GOOGLE VARIABLES
  googleUser: any;
  gProfile: any;
  facebook: any;
  fbProfile: any;
  facebookUser: any;
  dataUser: any;

  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private capgoAuthService: CapgoAuthService,
    private deviceCheck: NetworkStatusService,
	private capGoFacebookAuth: CapgoFacbookAuthService,
  ) {
    this.type = 'password';
  }

  ngOnInit() {
    this.initStorage();
  }

  async ionViewWillEnter(){
    const deviceID = await this.deviceCheck.getDeviceID();
    console.log(deviceID);
    if (deviceID) {
     this.user.device_id = deviceID;
    } else {
     this.user.device_id = "";
    }
  }

  async userSignIn() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    loading.present();
    this.http.post(this.url + 'process-login.php', this.user).subscribe({
      next: (res: any) => {
        console.log(res);
        this.state = res;
        if (this.state.status === 'success') {
          this.storage.set('currentUser', this.state?.user);
          loading.dismiss();
          this.flashMessage('User successfully logged in!', "lock-open-outline");
          this.router.navigate(['/user-menu/user-dashboard']);
        }
        if (this.state?.status === 'new device') {
          loading.dismiss();
          this.flashMessage('User account is connected to another device!', "alert-circle-outline");
        }
        if (this.state?.status === 'error') {
          loading.dismiss();
          this.flashMessage('Invalid login details!', "alert-circle-outline");
        }
      },
      error: (err: any) => {
        console.log(err);
        loading.dismiss();
        this.flashMessage('There was an error, please check your connection and try again!', 'alert-circle-outline');
      }
    });

  }

  async progressLoading(msg: any) {
    const loading = await this.loadingController.create({
      message: msg,
      duration: 2000,
      spinner: 'bubbles'
    });
    await loading.present();
  }

  async flashMessage(msg: string, icon: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "primary",
      icon: icon,
    });
    toast.present();
  }

  async initStorage() {
    return await this.storage.create();
  }

  showPasswordText() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  async notificationMessage(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 4000
    });
    toast.present();
  }

  forgotPassword() {
    return this.router.navigate(['/forgot-password']);
  }

  checkEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email)) {
      console.log('Email valid');
      this.validEmail = true;
    } else {
      console.log('Not Email valid');
      this.validEmail = false;
    }
    console.log(this.validEmail);
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
          this.flashMessage('There was an error, please check your connection and try again!', 'alert-circle-outline');
        },
      });
    } else {
      this.flashMessage('Something went wrong, please try again later!', 'alert-circle-outline');
    }
  }

	//FACEBOOK LOGIN
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
        this.flashMessage('Something went wrong, please try again later!', 'alert-circle-outline');
      }
    })
  }

  //APPLE LOGIN
  async appleLogin() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Apple Login Here',
      buttons: ['OK']
    });

    await alert.present();
  }

  async flashNotice(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

}
