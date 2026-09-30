import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { NetworkStatusService } from 'src/app/services/network-status.service';
import { environment } from 'src/environments/environment';

import { Capacitor } from '@capacitor/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-flip-learn',
  templateUrl: './flip-learn.page.html',
  styleUrls: ['./flip-learn.page.scss'],
  standalone: false,
})
export class FlipLearnPage implements OnInit {
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

  network: any;
  connection: any;

  url = environment.url;
  DB_TOSE = environment.database;
  database!: SQLiteObject;

  uploadType: any;
  record: any;
  isPlaying: boolean = false;

  audio: any;
  connected: any;

  offlineImgPath: any;

  imageAudioPath = environment.audioPath;
  imagePath = environment.imagePath;
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
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');
    console.log(this.unitID);
    this.getFlipLearnQuestions(this.unitID);
    this.getCurrentUser();
  }

  async storageInit() {
    await this.storage.create();
  }

  getCurrentUser() {
    this.storage.get('currentUser').then((user: any) => {
      this.user = user;
      console.log(this.user);
    });
  }

  async getFlipLearnQuestions(data: any) {
    const id = data;
    console.log("Flip Learn: ", id);
    const networkState = await this.networkService.getNetworkConnection();
    this.connection = networkState?.connected;
    if (!this.connection) {
      //OFFLINE DATA
      this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');
      this.getFlipLearnQuestionsOffline(id);
      return;
    }
    //ONLINE DATA
    this.http
      .get(this.url + 'get-flip-learn-questions.php?unitID=' + id)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.unit = res?.unit;
          this.questions = res?.flipQuestions;
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

  async getFlipLearnQuestionsOffline(unitId: any) {
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

      //FLIP & LEARN DATA
      const resFlip = await this.database.executeSql(
        `SELECT * FROM  app_flip_learn WHERE  unit_id=?`,
        [unitId]
      );

      if (resFlip.rows.length > 0) {
        this.questionsOffline = [];
        for (let i = 0; i < resFlip.rows.length; i++) {
          const flipItem = resFlip.rows.item(i);
          //CONVERT IMAGE
          if (flipItem.flip_image_offline) {
            flipItem.flip_image_offline_url = Capacitor.convertFileSrc(
              flipItem.flip_image_offline
            );
          }
          this.questionsOffline.push(flipItem);
        }
        console.log('Flip & Learn Offline: ', this.questionsOffline);
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
    console.log(postAnswer);
    this.http
      .post(this.url + 'process-flip-learn-answer.php', postAnswer)
      .subscribe({
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
}
