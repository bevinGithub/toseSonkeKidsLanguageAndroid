import { AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NetworkStatusService } from 'src/app/services/network-status.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
  standalone: false,
})
export class PlayerPage implements OnInit {
video: any;
videoPath: any;
videoUrl: any;
connection: any;
showNotice: boolean = false;
url = environment.url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private toastController: ToastController,
    private alertController: AlertController,
    private networkService: NetworkStatusService
  ) {

   }

  ngOnInit() {
  }

  ionViewWillEnter(){
   this.getActiveVideo();
  }

  async getActiveVideo() {
    this.connection = await this.networkService.getNetworkConnection();
    console.log('Network Connection Status:', this.connection);
    if (!this.connection?.connected) {
      this.networkService.noConnection();
      return;
    }
    this.http.get(this.url + 'get-intro-video.php').subscribe({
      next: (data: any) => {
        console.log(data);
        this.video = data;
        console.log(this.isValidURL(this.video?.video_link));
        if (this.video?.video_link !== '' && this.isValidURL(this.video?.video_link)) {
          this.playVideo(this.video?.video_link);
        } else {
          this.presentToast();
          this.router.navigate([`/user-menu/user-dashboard`]);
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  async networkCheck() {
    const alert = await this.alertController.create({
      header: 'No Internet Connection',
      message: 'Please check your internet connection and try again.',
      buttons: ['OK']
    });
    await alert.present();
  }

  playVideo(url: string) {
      this.videoPath = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  isValidURL(string: any) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Video is not available',
      duration: 2000
    });
    toast.present();
  }


}
