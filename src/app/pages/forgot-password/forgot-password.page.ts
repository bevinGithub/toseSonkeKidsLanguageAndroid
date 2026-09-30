import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: false,
})
export class ForgotPasswordPage implements OnInit {
  user: any = {};
  state: any;
  showPass: any;
  type: any;

  validEmail: boolean = false;

  url = environment.url;
  constructor(
        private http: HttpClient,
        private router: Router,
        private toastController: ToastController,
        private loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }

  async userForgotPassword() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    loading.present();
    this.http.post(this.url + 'process-forgot-password.php', this.user).subscribe({
      next: (res: any) => {
        this.state = res;
        if (this.state?.status === 'success') {
          loading.dismiss();
          this.flashMessage('Forgot password reset was successful!');
          this.router.navigate(['/forgot-password-confirmation']);
        } else {
          loading.dismiss();
          this.flashMessage('Forgot password was nt successful!');
        }
      },
      error: (err: any) => {
        loading.dismiss();
        this.flashMessage('Something went wron, please try again later! ' + JSON.stringify(err));
      }
    });

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

}
