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
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-tap-learn',
  templateUrl: './tap-learn.page.html',
  styleUrls: ['./tap-learn.page.scss'],
  standalone: false,
})
export class TapLearnPage implements OnInit {
  tapLessons: any;
  tapLessonsOffline: any;
  unit: any;
  unitID: any;
  url = environment.url;
  audio: any;
  record: any;

  isPlaying: boolean = false;

  network: any;
  connection: any;
  audioPath = environment.audioUrl;
  imagePath = environment.imagePath;

  DB_TOSE = environment.database;
  database!: SQLiteObject;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private networkStatusService: NetworkStatusService,
    private sqlite: SQLite,
    private dbService: DatabaseService
  ) {
    this.storageInit();
    this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');
    console.log(this.unitID);
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');
    console.log(this.unitID);
    this.getTapLessons(this.unitID);
  }

  async storageInit() {
    await this.storage.create();
  }

  async getTapLessons(unitId: string) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();

    this.network = await this.networkStatusService.getNetworkStatus();
    this.connection = this.network?.connected;
    if (!this.connection) {
      //OFFLINE DATA
      this.getTapLessonsOffline(unitId);
      loading.dismiss();
      return;
    }
    //ONLINE DATA ACCESS
    this.http.get(this.url + 'get-tap-learn.php?unitID=' + unitId).subscribe({
      next: (res: any) => {
        this.storage.set('tapLearn', res);
        this.tapLessons = res?.tapLearn;
        this.record = res?.tapLearn;
        this.unit = res?.unit;
        loading.dismiss();
      },
      error: (err: any) => {
        console.log(err.message);
        loading.dismiss();
      },
    });
  }

  async getTapLessonsOffline(unitId: string) {
    try {
      this.database = await this.dbService.connectDB();
      const unitRes = await this.database.executeSql(
        `SELECT * FROM app_course_units WHERE myunit_id=?`,
        [unitId]
      );
      if (unitRes.rows.length > 0) {
        this.unit = unitRes.rows.item(0);
        console.log('Unit Data Offline: ', this.unit);
      }

      //TAP & LEARN DATA
      const tapRes = await this.database.executeSql(
        `SELECT * FROM  app_tap_learn WHERE unit_id=?`,
        [unitId]
      );

      if (tapRes.rows.length > 0) {
        this.tapLessonsOffline = [];
        for (let i = 0; i < tapRes.rows.length; i++) {
          const tapItem = tapRes.rows.item(i);
          //CONVERT IMAGE
          if (tapItem.tap_image_offline) {
            tapItem.tap_image_offline = Capacitor.convertFileSrc(
              tapItem.tap_image_offline
            );
          }
          this.tapLessonsOffline.push(tapItem);
        }
        console.log('Tap Learn Offline: ', this.tapLessonsOffline);
      }
    } catch (error) {
      console.log('Database connection error: ', error);
    }
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
      console.log('Audio has ended playing!', this.isPlaying);
    });
  }

  stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
  }

  async playAudioOnDevice(audioFile: any) {
    this.record = audioFile?.audio;
    const fileData = audioFile?.audio;
    const filePath = fileData?.tap_audio_offline;
    try {
      const fileResult = filePath;
      const fileSrc = Capacitor.convertFileSrc(fileResult);
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

      console.log('Playing Local audio');
    } catch (error) {
      console.error('Error playing audio:', error);
      this.flashMessage('Error playing audio');
    }
  }

  ionViewDidLeave() {
    this.stopAudio();
  }
}
