import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.page.html',
  styleUrls: ['./activate-user.page.scss'],
  standalone: false
})
export class ActivateUserPage implements OnInit {
  user: any = {};
  state: any;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.storageInit();
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.clear();
  }

  async storageInit() {
    await this.storage.create();
  }

  async flashMessage(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async userActivation() {
    console.log(this.user);
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    loading.present();
    this.http.post(this.url + 'process-activation.php', this.user).subscribe((res: any) => {
      console.log(res);
      this.state = res;
      if (this.state.status === 'success') {
        loading.dismiss();
        this.flashMessage('User account has been successfully activated!');
        this.router.navigate(['/signin']);
      } else {
        loading.dismiss();
        this.flashMessage('User registration failed, please try again later!');
      }
    }, (err) => {
      loading.dismiss();
      this.flashMessage('Error, something went wrong!');
    })
  }

}
