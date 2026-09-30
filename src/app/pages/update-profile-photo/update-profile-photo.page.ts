import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-profile-photo',
  templateUrl: './update-profile-photo.page.html',
  styleUrls: ['./update-profile-photo.page.scss'],
  standalone: false,
})
export class UpdateProfilePhotoPage implements OnInit {
  state: any;
  userInfo: any;
  picture: any;
  loggedUser: any;
  currentUser: any;

  url = environment.url;
  path = 'img/avatars/';

  avatars = [
    {
      avatar: 'avatar-1.svg',
    },
    {
      avatar: 'avatar-2.svg',
    },
    {
      avatar: 'avatar-3.svg',
    },
    {
      avatar: 'avatar-4.svg',
    },
    {
      avatar: 'avatar-5.svg',
    },
    {
      avatar: 'avatar-6.svg',
    },
    {
      avatar: 'avatar-7.svg',
    },
    {
      avatar: 'avatar-8.svg',
    },
    {
      avatar: 'avatar-9.svg',
    },
  ];
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.loggedUser = await this.getUserSession();
    this.getProfilePhoto(this.loggedUser?.id);
  }

  async storageInit() {
    await this.storage.create();
  }

  getUserSession() {
    this.currentUser = this.storage.get('currentUser');
    return this.currentUser;
  }

  async addAvatarProfile(file: any) {
    this.loggedUser = await this.getUserSession();
    const postAvatar = {
      userID: this.loggedUser?.id,
      avatar: file?.avatar
    }
    console.log(postAvatar);
    this.http.post(this.url + 'update-avatar-profile.php', postAvatar).subscribe({
      next: (res: any) => {
        this.state = res;
        if (this.state?.status === 'success') {
          this.flashNotice('Avatar has been successfully updated!');
          this.router.navigate(['/user-menu/user-dashboard']);
        }
        if (this.state?.status === 'error') {
          this.flashNotice('Avatar could not be updated successfully!');
        }
      },
      error: (err: AnyCatcher) => {
        console.log(err);
        this.flashNotice('Error: something went wrong!');
      }
    })
    
  }

  takePhotos = async () => {
    const image = await Camera.getPhoto({
      quality: 60,
      width: 300,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });
    this.picture = image.dataUrl;
    const userEmail = this.loggedUser?.email;
    const myData = { email: userEmail, image: this.picture };
    console.log(myData);

    this.http
      .post(this.url + 'update-profile-image-new.php', myData)
      .subscribe({
        next: (data) => {
          this.state = data;
          if (this.state?.status === 'success') {
            this.flashNotice('Profile photo successfully saved!');
            this.router.navigate(['/user-menu/settings']);
          }
        },
        error: (err: any) => {
          this.flashNotice(err.message);
        },
      });
  };

  async successAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Profile Photo Confirmation',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async flashNotice(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "primary",
      icon: "checkmark-done-outline",
    });
    toast.present();
  }

  async errorAlert(error: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: error,
      buttons: ['OK'],
    });

    await alert.present();
  }

  getProfilePhoto(userId: any) {
    this.http
      .get(this.url + 'get-current-user.php?userID=' + userId)
      .subscribe({
        next: (data: any) => {
          this.userInfo = data;
          console.log(this.userInfo);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
}
