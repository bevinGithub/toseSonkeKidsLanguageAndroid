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
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-sing-learn',
  templateUrl: './sing-learn.page.html',
  styleUrls: ['./sing-learn.page.scss'],
  standalone: false,
})
export class SingLearnPage implements OnInit {
  unitID: any;
  audios: any;
  audiosOffline: any;

  user: any;
  state: any;

  isPlaying: boolean = false;
  index: any;
  record_id: any;

  audio: any;
  audioPath = environment.audioPath;

  network: any;
  connection: any;

  url = environment.url;
  DB_TOSE = environment.database;
  database!: SQLiteObject;

  audioLessons: any;
  unit: any;
  connected: any;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private sqlite: SQLite,
    private networkService: NetworkStatusService,
    private dbService: DatabaseService
  ) {
    this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');
    this.getSingLearnAudios(this.unitID);
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    const networkState = await this.networkService.getNetworkConnection();
    this.connected = networkState?.connected;
    console.log("Network State: ", this.connected);    
  }

  async getSingLearnAudios(unitId: string) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();

    const networkState = await this.networkService.getNetworkConnection();
    this.connected = networkState?.connected;

    if (!this.connected) {
      loading.dismiss();
      await this.getSingLearnAudiosOffline(this.unitID);
      return;
    }
    //ONLINE DATA
    this.http.get(this.url + 'get-sing-learn.php?unitID=' + unitId).subscribe({
      next: (res: any) => {
        console.log(res);

        this.audios = res?.singLearn;
        this.unit = res?.unit;
        loading.dismiss();
      },
      error: (err: any) => {
          console.log(err);
          loading.dismiss();
      },
    });
  }

  async getSingLearnAudiosOffline(unitId: any) {
    try {
      this.database = await this.dbService.connectDB();

      const unitRes = await this.database.executeSql(
        `SELECT * FROM app_course_units WHERE myunit_id=?`,
        [unitId]
      );
      if (unitRes.rows.length > 0) {
        this.unit = unitRes.rows.item(0);
        console.log('Unit Offline Data: ', this.unit);
      }

      //FLIP & LEARN DATA
      const resSing = await this.database.executeSql(
        `SELECT * FROM  app_sing_learn WHERE  unit_id=?`,
        [unitId]
      );

      if (resSing.rows.length > 0) {
        this.audios = [];
        for (let i = 0; i < resSing.rows.length; i++) {
          this.audios.push(resSing.rows.item(i));
        }
        console.log('Sing & Learn Offline: ', this.audios);
      }
    } catch (error) {
      console.log('Database connection error: ', error);
    }

  }

  playAudio(res: any) {
    const audioFile = res?.item;
    this.index = audioFile?.id;
    this.record_id = audioFile?.id;
    this.audio = new Audio();
    const file = `${this.audioPath}sing_uploads/${audioFile?.audio_file}`;
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
      this.isPlaying = true;
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

  async playAudioOnDevice(audioFile: any) {
    const audioData = audioFile?.audio;
    const filePath = audioData?.audio_file_offline;
    this.record_id = audioData?.mysql_id;
    console.log('Audio Offline Path:', filePath);
    try {
      const fileResult = filePath;
      console.log(fileResult);
      const fileSrc = Capacitor.convertFileSrc(fileResult.uri);
      this.audio = new Audio(fileSrc);

      if (!this.audio.paused) {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
        console.log('Audio stopped playing!!');
        return;
      } else {
        this.isPlaying = true;
        await this.audio.play();
        console.log('Audio is playing!!', this.isPlaying);
      }

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        console.log('Audio has ended playing!', this.isPlaying);
      });

    } catch (error) {
      console.error('Error playing audio:', error);
      this.flashMessage('Error playing audio');
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
