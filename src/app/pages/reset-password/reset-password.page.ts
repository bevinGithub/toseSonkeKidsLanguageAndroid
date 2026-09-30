import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: false,
})
export class ResetPasswordPage implements OnInit {
  user: any = {};
  state: any;
  showPass: any;
  type: any;

  showPass1: any;
  type1: any;

  showPass2: any;
  type2: any;

  password: any;
  confirmPassword: any;

  validEmail: boolean = false;
  validPassword: boolean = false;

  url = environment.url;
  constructor(
        private http: HttpClient,
        private router: Router,
        private storage: Storage,
        private toastController: ToastController,
        private loadingController: LoadingController,
  ) {
    this.type1 = 'password';
    this.type2 = 'password';
    this.initStorage();
  }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.getUserID();
  }

  async userResetPassword() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    loading.present();
    console.log(this.user);
    this.http.post(this.url + 'process-reset-password.php', this.user).subscribe({
      next: (res: any) => {
        this.state = res;
        console.log(this.state);
        if (this.state?.status === 'success') {
          loading.dismiss();
          this.flashMessage('Password reset was successfully completed!');
          this.router.navigate(['/user-menu/user-dashboard']);
        } else {
          loading.dismiss();
          this.flashMessage('Reset password was not successful');
        }
      },
      error: (err: any) => {
        loading.dismiss();
        this.flashMessage('Something went wrong, please try again later! ' + JSON.stringify(err));
      }
    });

  }

  getUserID() {
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      return this.user.userID = user?.id;
    });
  }

  checkPassword() {
    this.password = this.user.password;
    this.confirmPassword = this.user.confirm_password;
    if (this.password === this.confirmPassword) {
      console.log('Password do match');
      this.validPassword = true;
    } else {
      console.log('Error on password');
      this.validPassword = false;
    }
  }

  showPassword() {
    this.showPass1 = !this.showPass1;
    if (this.showPass1) {
      this.type1 = 'text';
    } else {
      this.type1 = 'password';
    }
  }

  showPasswordConfirm() {
    this.showPass2 = !this.showPass2;
    if (this.showPass2) {
      this.type2 = 'text';
    } else {
      this.type2 = 'password';
    }
  }

  checkPasswords() {
    if (this.user.password !== this.user.confirm_password) {
      this.confirmMessage('Passwords do not match!');
    }
  }

  async confirmMessage(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 3000
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

  async flashMessage(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 4000
    });
    toast.present();
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

  async initStorage() {
    return await this.storage.create();
  }

}
