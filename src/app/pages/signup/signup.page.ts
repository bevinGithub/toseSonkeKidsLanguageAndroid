import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { Device } from '@capacitor/device';
import { NetworkStatusService } from 'src/app/services/network-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false,
})
export class SignupPage implements OnInit {
  user: any = {};
  state: any;
  validEmail: boolean = false;

  type: any;
  type1 = 'password';
  type2 = 'password';

  showPass: boolean = false;
  showPass1: boolean = false;
  showPass2: boolean = false;

  validPassword: boolean = false;
  password: any;
  confirmPassword: any;

  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private deviceCheck: NetworkStatusService,
  ) { }

  ngOnInit() {
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

  viewTermsConditions() {
    return this.router.navigate(['/terms-conditions']);
  }

  checkEmail2() {
    // eslint-disable-next-line max-len
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!reg.test(this.user.email)) {
      this.emailMessage('Please provide a valid email address!');
    } else {
      console.log('Email is valid');
    }
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

  checkPasswords() {
    if (this.user.password !== this.user.confirm_password) {
      this.emailMessage('Passwords do not match!');
    }
  }

  checkPassword() {
    this.validPassword = false;
    this.password = this.user.password;
    this.confirmPassword = this.user.confirm_password;
    if (this.password === this.confirmPassword) {
      console.log('Password do match');
      this.validPassword = true;
    } else {
      console.log('Error on password');
      this.validPassword = false;
    }
    console.log(this.validPassword);
  }

  async emailMessage(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 4000
    });
    toast.present();
  }

  async confirmMessage(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 4000
    });
    toast.present();
  }


  showPasswordText() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  showPasswordRegister() {
    this.showPass1 = !this.showPass1;
    if (this.showPass1) {
      this.type1 = 'text';
    } else {
      this.type1 = 'password';
    }
  }

  showPasswordRegisterConfirm() {
    this.showPass2 = !this.showPass2;
    if (this.showPass2) {
      this.type2 = 'text';
    } else {
      this.type2 = 'password';
    }
  }

  async flashMessage(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  async userSignUp() {
    console.log(this.user);
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    loading.present();
    this.http.post(this.url + 'process-app-registration.php', this.user).subscribe((res: any) => {
      console.log(res);
      this.state = res;
      if (this.state.status === 'success') {
        loading.dismiss();
        this.flashMessage('User successfully registered!');
        this.router.navigate(['/activate-user']);
      } else {
        loading.dismiss();
        this.flashMessage('User registration failed, please try again later!');
      }
    }, (err) => {
      loading.dismiss();
      this.flashMessage('There was an error, please check your connection and try again later!');
    })
  }

}
