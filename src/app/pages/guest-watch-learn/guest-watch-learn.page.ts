import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { NetworkStatusService } from './../../services/network-status.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-guest-watch-learn',
  templateUrl: './guest-watch-learn.page.html',
  styleUrls: ['./guest-watch-learn.page.scss'],
  standalone: false,
})
export class GuestWatchLearnPage implements OnInit {
watchLessons: any;
  unit: any;
  unitID: any;
  url = environment.url;
  video: any;
  videoPath: any;

  iconColor: any;

  network: any;
  connection: any;
  audioPath = environment.audioUrl;

  DB_TOSE = environment.database;
  database!: SQLiteObject;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private networkStatusService: NetworkStatusService,
    private domSanitizer: DomSanitizer,
    private sqlite: SQLite
  ) {
    this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');
    console.log(this.unitID);
    this.getWatchLearnLessons(this.unitID);
  }

  ngOnInit() {}

  async ionViewWillEnter(){

  }

  async ionViewDidEnter(){
    this.network = await this.networkStatusService.getNetworkStatus();
    console.log(this.network?.connected);
    this.connection = this.network?.connected;
    if (this.connection === false) {
     this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');

    }
  }

  async storageInit() {
    await this.storage.create();
  }

  async getWatchLearnLessons(unitId: string) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();

    this.http.get(this.url + 'get-watch-learn.php?unitID=' + unitId)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.unit = res?.unit;
          this.iconColor = this.unit?.icon_name.replace(".svg", "");
          console.log(this.iconColor);
          this.watchLessons = res?.watchLearn;
          this.video = this.watchLessons?.video_url ;
          if (this.watchLessons?.video_url !== '') {
            this.playVideo(this.watchLessons?.video_url);
          } else {
            this.flashMessage('Video not available');
          }
          
          loading.dismiss();
        },
        error: (err: any) => {
          console.log(err.message);
          loading.dismiss();
          this.flashMessage('Something went wrong, please try again later!');
        },
      });
  }


  playVideo(url: string) {
    this.videoPath = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  async flashMessage(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

}
