import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
  standalone: false,
})
export class AddMemberPage implements OnInit {
  user: any = {};
  userID: any;
  state: any;
  parentUser: any;

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

  ngOnInit() {}

  ionViewWillEnter() {
    this.currentUser();
  }

  async storageInit() {
    await this.storage.create();
  }

  currentUser() {
    this.storage.get('currentUser').then((user) => {
      console.log(user);
      this.parentUser = user;
      this.user.parentID = this.parentUser?.id;
    });
  }

  async addMember() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    //loading.present();
    console.log(this.user);

    this.http.post(this.url + 'create-new-member.php', this.user).subscribe({
      next: (member: any) => {
        console.log(member);
        this.state = member;
        if (this.state?.status === 'success') {
          loading.dismiss();
          this.systemNotice('Member has been successfully added!');
          this.router.navigate(['/subscription-details'])
        }
        if (this.state?.status === 'user exists') {
          loading.dismiss();
          this.systemNotice('Member could not be added, email already in use!');
        }
        if (this.state?.status === 'error') {
          loading.dismiss();
          this.systemNotice('Member could not be added, please contact Administrator!');
        }
      },
      error: (err: any) => {
        console.log(err);
        loading.dismiss();
        this.systemNotice('Something went wrong, please contact Administrator!');
      }
    });
  }

  async systemNotice(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
