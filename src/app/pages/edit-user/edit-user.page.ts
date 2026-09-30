import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
  standalone: false,
})
export class EditUserPage implements OnInit {
  user: any = {};
  userID: any;
  state: any;

  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.userID = this.activatedRoute.snapshot.paramMap.get('userID');
    console.log(this.userID);
    this.getUserData(this.userID);
  }

  ngOnInit() {}

  getUserData(userId: any) {
    this.http.get(this.url + 'get-user.php?userID=' + userId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.user = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  async updateUser() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();
    this.http.post(this.url + 'process-update-user.php', this.user).subscribe({
      next: (res: any) => {
        this.state = res;
        if (this.state?.status === 'success') {
          loading.dismiss();
          this.systemNotice('User profile has been successfully updated!');
          this.router.navigate(['/user-menu/profile'])
        }
        if (this.state?.status === 'error') {
          loading.dismiss();
          this.systemNotice('User profile could not be updated!');
        }
      },
      error: () => {
        loading.dismiss();
        this.systemNotice('Something went wrong, Please try again later');
      },
    });
  }

  async systemNotice(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
