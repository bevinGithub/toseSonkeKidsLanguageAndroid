import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { NetworkStatusService } from 'src/app/services/network-status.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-guest-practice-time',
  templateUrl: './guest-practice-time.page.html',
  styleUrls: ['./guest-practice-time.page.scss'],
  standalone: false,
})
export class GuestPracticeTimePage implements OnInit {
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

  iconColor: any;

  audio: any;
  imageAudioPath = environment.audioPath;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private networkStatusService: NetworkStatusService,
    private sqlite: SQLite
  ) {
    this.storageInit();
    this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');
    console.log(this.unitID);
    this.getPracticeTimeQuestions(this.unitID);
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.answerState = '';
    this.getCurrentUser();
    this.network = await this.networkStatusService.getNetworkStatus();
  }

  async storageInit() {
    await this.storage.create();
  }

  getCurrentUser() {
    this.storage.get('currentUser').then((user: any) => {
      this.user = user;
    });
  }

  getPracticeTimeQuestions(data: any) {
    const id = data;
    this.http.get(this.url + 'get-practice-time-questions.php?unitID=' + id).subscribe({
        next: (res: any) => {
          console.log(res);
          this.unit = res?.unit;
          this.iconColor = this.unit?.icon_name.replace(".svg", "");
          console.log(this.iconColor);
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
      color: "primary",
      icon: "checkmark-done-outline",
      cssClass: response,
    });
    toast.present();
  }

  async wrongResponse(msg: any, response: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "primary",
      icon: "alert-circle-outline",
      cssClass: response,
    });
    toast.present();
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
        console.log('Audio has ended!')
      });
    }
  }

  stopAudio(data: any) {
    console.log(data);
    const index = data?.item?.id;
    console.log('Stop Audio Index: ', index);
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      console.log('Audio Stopped');
    }
  }

}
