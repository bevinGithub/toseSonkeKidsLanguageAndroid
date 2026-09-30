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
  selector: 'app-rhymes-playlist',
  templateUrl: './rhymes-playlist.page.html',
  styleUrls: ['./rhymes-playlist.page.scss'],
  standalone: false,
})
export class RhymesPlaylistPage implements OnInit {
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
    
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');
    this.getSingLearnAudios(this.unitID);
  }

  async getSingLearnAudios(unitId: string) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();

    const networkState = await this.networkService.getNetworkConnection();
    this.connected = networkState?.connected;
    console.log('Network State: ', this.connected); 
    if (!this.connected) {
      //this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');
      loading.dismiss();
      this.getRhymesPlaylistOffline(this.unitID);
      return;
    }
    //ONLINE DATA
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

  async getRhymesPlaylistOffline(unitId: string) {
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

      //RHYMES PLAYLIST
      const resRhymes = await this.database.executeSql(
        `SELECT * FROM  app_rhymes_list WHERE  unit_id=?`,
        [unitId]
      );

      if (resRhymes.rows.length > 0) {
        this.audios = [];
        for (let i = 0; i < resRhymes.rows.length; i++) {
          this.audios.push(resRhymes.rows.item(i));
        }
        console.log('Rhymes Playlist Offline: ', this.audios);
      }

    } catch (error) {
      console.log('Database connection error: ', error);
    }
  }

  playAudio(res: any) {
    const audioFile = res?.audio;
    this.record = res?.audio;
    this.index = audioFile?.id;
    console.log('Audio Files: ', res);
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

  async playAudioOnDevice(audioFile: any) {
    const fileData = audioFile?.audio;
    this.record = audioFile?.audio;
    const filePath = fileData?.audio_file_offline;
    console.log('Audio Path Offline:', filePath);
    try {
      const fileResult = filePath;
      console.log(fileResult);
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

    } catch (error) {
      console.error('Error playing audio:', error);
      this.flashMessage('Error playing audio');
    }
  }
  
  ionViewDidLeave(){
    this.stopAudio();
  }

}
