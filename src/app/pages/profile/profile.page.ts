import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { NetworkStatusService } from 'src/app/services/network-status.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  loggedUser: any;
  currentUser: any;
  user: any;
  updatedData: any;
  company: any;

  photo: any;
  userID: any;
  state: any;
  isConnected: any;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private networkStatusService: NetworkStatusService
  ) {
    this.storageInit();
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.loggedUser = await this.getUserSession();
    const userID = this.loggedUser?.id;
    this.getCurrentUser(userID);
    const onlineStatus = await this.networkStatusService.getNetworkConnection();
    this.isConnected = onlineStatus.connected;
  }

  ionViewDidEnter() {
    this.getUserData();
  }

  async storageInit() {
    await this.storage.create();
  }

  getUserSession() {
    this.currentUser = this.storage.get('currentUser');
    return this.currentUser;
  }

  async getCurrentUser(userID: any) {
    const loading = await this.loadingController.create({
      message: 'Please wait..',
    });
    loading.present();
    //OFFLINE
    const onlineStatus = await this.networkStatusService.getNetworkConnection();
    this.isConnected = onlineStatus.connected;
    console.log('Connection Status: ', this.isConnected);
    if (!this.isConnected) {
      loading.dismiss();
      this.getUserDataOffline();
      return;
    }
    //ONLINE DATA
    this.http
      .get(this.url + 'get-current-user.php?userID=' + userID)
      .subscribe({
        next: (user: any) => {
          this.user = user;
          console.log(this.user);
          loading.dismiss();
        },
        error: (err: any) => {
          console.log(err);
          loading.dismiss();
        },
      });
  }

  updateUserData(userID: any) {
    console.log(userID);
    this.http
      .get(this.url + 'get-current-user.php?userID=' + userID)
      .subscribe({
        next: (user: any) => {
          this.user = user;
          this.storage.set('currentUser', this.user);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  async getUserData() {
    this.loggedUser = await this.getUserSession();
    const userID = this.loggedUser?.id;
    console.log('Current User', userID);
    this.getCurrentUser(userID);
  }

  async logOut() {
    const userEmail = this.loggedUser?.user_email;
    console.log(userEmail);
    const logData = { userEmail: userEmail };
    this.http
      .post(this.url + 'services/last-login.php', logData)
      .subscribe((resp: any) => {
        console.log(resp);
      });
    await this.storage.clear();
    this.logoutMsg('User has successfully logged out!');
    this.router.navigate(['/welcome']);
  }

  async logoutMsg(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }

  getUserDataOffline() {
    this.storage.get('currentUser').then((user: any) => {
      this.user = user;
      console.log('Offline storage: ', this.user);
    });
  }
}
