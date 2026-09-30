import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { NetworkStatusService } from './../../services/network-status.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-guest-tap-learn',
  templateUrl: './guest-tap-learn.page.html',
  styleUrls: ['./guest-tap-learn.page.scss'],
  standalone: false,
})
export class GuestTapLearnPage implements OnInit {
  tapLessons: any;
  unit: any;
  unitID: any;
  url = environment.url;
  audio: any;
  record: any;

  isPlaying: boolean = false;

  network: any;
  connection: any;
  audioPath = environment.audioUrl;
  imagePath = environment.imagePath

  iconColor: any;

  DB_TOSE = environment.database;
  database!: SQLiteObject;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private networkStatusService: NetworkStatusService,
    private sqlite: SQLite
  ) {
    this.storageInit();
    this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');
    console.log(this.unitID);
    this.getTapLessons(this.unitID);
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

  async getTapLessons(unitId: string) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();

    this.http.get(this.url + 'get-tap-learn.php?unitID=' + unitId)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.storage.set('tapLearn', res);
          this.tapLessons = res?.tapLearn;
          this.record = res?.tapLearn;
          this.unit = res?.unit;
          this.iconColor = this.unit?.icon_name.replace(".svg", "");
          console.log(this.iconColor);
          loading.dismiss();
        },
        error: (err: any) => {
          console.log(err.message);
          loading.dismiss();
          this.flashMessage('Something went wrong, please try again later!');
        },
      });
  }

  async flashMessage(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  playAudio(res: any) {
    const audioFile = res?.audio;
    this.record = res?.audio;
    this.audio = new Audio();
    const file = `${this.audioPath}${audioFile?.tap_audio}`;
    console.log('Audio File:', file);
    
    this.audio.src = file;

    if (!this.audio.paused) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      console.log('Audio stopped playing!!');
      return;
    } else {
      this.isPlaying = true;
      this.audio.load();
      this.audio.play();
      console.log('Audio is playing!!', this.isPlaying);
    }

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      console.log('Audio has ended playing!', this.isPlaying)
    });
  }

  stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      console.log('Audio stopped playing by user!', this.isPlaying)
    }
  }

  async playAudioOnDevice(audioFile: any) {
    const fileData = audioFile?.audio;
    const filePath = fileData?.audio_lesson;
    console.log('Audio Path:', filePath);
    try {
      const fileResult = await Filesystem.getUri({
        directory: Directory.Documents,
        path: filePath,
      });
      console.log(fileResult);
      const fileSrc = Capacitor.convertFileSrc(fileResult.uri);
      const audio = new Audio(fileSrc);
      await audio.play();
      console.log('Playing Local audio');
    } catch (error) {
      console.error('Error playing audio:', error);
      this.flashMessage('Error playing audio');
    }
  }

  ionViewDidLeave(){
   this.stopAudio();
  }

}
