import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { NetworkStatusService } from 'src/app/services/network-status.service';
import { environment } from 'src/environments/environment';

import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-practice-time',
  templateUrl: './practice-time.page.html',
  styleUrls: ['./practice-time.page.scss'],
  standalone: false,
})
export class PracticeTimePage implements OnInit {
  user: any;
  unitID: any;
  unit: any;
  questions: any;
  questionsOffline: any;

  answers: any = {};
  answerState: any;
  state: any;
  offlineAnswer: any;
  showNotice: boolean = false;

  url = environment.url;

  network: any;
  connection: any;

  DB_TOSE = environment.database;
  database!: SQLiteObject;

  uploadType: any;
  record: any;
  isPlaying: boolean = false;

  connected: any;

  audio: any;
  imageAudioPath = environment.audioPath;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private networkService: NetworkStatusService,
    private sqlite: SQLite,
    private dbService: DatabaseService
  ) {
    this.storageInit();
    this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');
    console.log(this.unitID);
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.answerState = '';
    this.getCurrentUser();
    await this.getPracticeTimeQuestions(this.unitID);
  }

  async storageInit() {
    await this.storage.create();
  }

  getCurrentUser() {
    this.storage.get('currentUser').then((user: any) => {
      this.user = user;
    });
  }

  async getPracticeTimeQuestions(data: any) {
    console.log("data: ", data);
    const id = data;
    const networkState = await this.networkService.getNetworkConnection();
    this.connected = networkState?.connected;
    console.log('Network State: ', this.connected);
    if (!this.connected) {
      await this.getPracticeTimeQuestionsOffline(id); 
      return
    }

    this.http
      .get(this.url + 'get-practice-time-questions.php?unitID=' + id)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.unit = res?.unit;
          this.questions = res?.mcQuestions;
          console.log(this.questions);
          if (this.questions === 'empty') {
            this.showNotice = true;
          } else {
            this.showNotice = false;
          }
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  async getPracticeTimeQuestionsOffline(unitId: any) {
    console.log("Unit ID: ", unitId);
    try {
      this.database = await this.dbService.connectDB();
      const unitRes = await this.database.executeSql(
        `SELECT * FROM app_course_units WHERE myunit_id=?`,
        [unitId]
      );
      if (unitRes.rows.length > 0) {
        this.unit = unitRes.rows.item(0);
        console.log('Unit Data: ', this.unit);
      }

      //PRACTICE TIME DATA
      const resPractice = await this.database.executeSql(
        `SELECT * FROM  app_practice_time WHERE  unit_id=?`,
        [unitId]
      );

      if (resPractice.rows.length > 0) {
        this.questions = [];
        for (let i = 0; i < resPractice.rows.length; i++) {
          const practiceItem = resPractice.rows.item(i);
          //CONVERT IMAGE
          if (practiceItem.image_file_offline) {
            practiceItem.image_file_offline = Capacitor.convertFileSrc(
              practiceItem.image_file_offline
            );
          }
          this.questions.push(practiceItem);
        }
        this.record = this.questions;
        console.log('Practice Time Offline: ', this.questions);
      }
    } catch (error) {
      console.log('Database connection error: ', error);
    }
  }

  radioAnswer(
    ev: any,
    selected_option: any,
    correct_answer: any,
    id: any,
    unit_id: any,
    index: any
  ) {
    const postAnswer = {
      userID: this.user?.id,
      unitID: unit_id,
      questionId: id,
      selectedOption: selected_option,
      correctAnswer: correct_answer,
      index: index,
    };
    this.http.post(this.url + 'process-mc-answer.php', postAnswer).subscribe({
      next: (res: any) => {
        this.state = res;
        console.log(this.state);
        if (this.state?.response === 'correct') {
          this.correctResponse('Great work!', this.state?.response);
        } else {
          this.wrongResponse('Oops try again!', this.state?.response);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  async correctResponse(msg: any, response: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'primary',
      icon: 'checkmark-done-outline',
      cssClass: response,
    });
    toast.present();
  }

  async wrongResponse(msg: any, response: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'primary',
      icon: 'alert-circle-outline',
      cssClass: response,
    });
    toast.present();
  }

  radioOfflineAnswer(
    ev: any,
    selected_option: any,
    correct_answer: any,
    id: any,
    lesson_id: any,
    index: any
  ) {
    const selectedOption = selected_option;
    const correctAnswer = correct_answer;
    if (selectedOption === correctAnswer) {
      this.correctResponse('Great work!', this.state?.response);
    } else {
      this.wrongResponse('Oops try again!', this.state?.response);
    }
  }

  playAudio(res: any) {
    this.record = res?.item;
    console.log(this.record);
    this.uploadType = this.record?.upload_type;
    this.audio = new Audio();
    const file = `${this.imageAudioPath}practice_uploads/${this.record?.audio_file}`;
    this.audio.src = file;
    this.isPlaying = false;
    if (this.uploadType === 'Audio') {
      if (!this.audio.paused) {
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
        console.log('Audio has ended!');
      });
    }
  }

  async playAudioOnDevice(audioFile: any) {
    const fileData = audioFile?.item;
    const filePath = fileData?.audio_file_offline;
    this.record = fileData;
    console.log('Audio Path:', filePath);
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

      console.log('Playing Local audio');
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

  stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      console.log('Audio Stopped');
    }
  }

  ionViewDidLeave() {
    //Stop audio when leaving the page
    console.log('Leaving Practice Time Page');
    this.stopAudio();
  }
}
