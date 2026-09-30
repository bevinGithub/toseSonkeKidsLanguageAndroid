import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { NetworkStatusService } from 'src/app/services/network-status.service';

import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-guest-rhymes-playlist',
  templateUrl: './guest-rhymes-playlist.page.html',
  styleUrls: ['./guest-rhymes-playlist.page.scss'],
  standalone: false,
})
export class GuestRhymesPlaylistPage implements OnInit {
unitID: any;
  audios: any;
  audiosOffline: any;

  user: any;
  state: any;

  isPlaying: boolean = false;
  index: any;

  audio: any;
  audioPath = environment.audioPath;

  network: any;
  connection: any;
  url = environment.url;
  DB_TOSE = environment.database;
  database!: SQLiteObject;

  record: any;
  audioLessons: any;
  unit: any;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private sqlite: SQLite,
    private networkStatusService: NetworkStatusService
  ) {
    this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');
    this.getSingLearnAudios(this.unitID);
  }

  ngOnInit() {}

  async ionViewWillEnter() {}

  async getSingLearnAudios(unitId: string) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();
    this.http.get(this.url + 'get-rhymes-playlist.php?unitID=' + unitId).subscribe({
      next: (res: any) => {
        console.log(res);

        this.audios = res?.rhymeLearn;
        this.unit = res?.unit;
        loading.dismiss();
      },
      error: (err: any) => {
        console.log(err);
        loading.dismiss();
      },
    });
  }

  playAudio(res: any) {
    const audioFile = res?.item;
    this.record = res?.item;
    this.index = audioFile?.id;
    this.audio = new Audio();
    const file = `${this.audioPath}rhymes_uploads/${audioFile?.audio_file}`;
    this.audio.src = file;
    this.isPlaying = false;

    if (!this.audio.paused) {
      console.log('Pause Audio');
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      console.log('Audio stopped playing!!');
      return;
    } else {
      if (this.record?.id) {
        this.isPlaying = true;
      } else {
        this.isPlaying = false;
      } 
      this.audio.load();
      this.audio.play();
      console.log('Audio is playing!!');
    }
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      console.log('Audio has ended!')
    });
  }

  stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      console.log('Audio Stopped');
    }
  }

  async flashMessage(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  ionViewDidLeave(){
    this.stopAudio();
  }


}
