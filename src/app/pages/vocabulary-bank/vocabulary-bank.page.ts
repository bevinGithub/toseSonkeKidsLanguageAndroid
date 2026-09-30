import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DatabaseService } from 'src/app/services/database.service';
import { LanguageService } from 'src/app/services/language.service';
import { NetworkStatusService } from 'src/app/services/network-status.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vocabulary-bank',
  templateUrl: './vocabulary-bank.page.html',
  styleUrls: ['./vocabulary-bank.page.scss'],
  standalone: false,
})
export class VocabularyBankPage implements OnInit {
  word: any = {};
  languages: any;
  lanID: any;
  words: any;
  tapWords: any;
  bankWords: any;
  connected: any;
  DB_TOSE = environment.database;
  database!: SQLiteObject;
  showMsg: boolean = false;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private languageService: LanguageService,
    private dbService: DatabaseService,
    private networkService: NetworkStatusService
  ) {
    this.storageInit();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.checkLanguageSelected();
    this.getLanguageList();
    this.getSelectedLanguage();
  }

  async storageInit() {
    await this.storage.create();
  }

  async getLanguageList() {
    const networkState = await this.networkService.getNetworkConnection();
    this.connected = networkState?.connected;
    console.log('Network State: ', this.connected);
    if (!this.connected) {
      await this.getLanguagesOffline();
      return;
    }
    this.http.get(this.url + 'get-app-languages.php').subscribe({
      next: (data: any) => {
        this.languages = data;
      },
      error: (error: any) => {
        console.error('Error fetching languages:', error);
      },
    });
  }

  async getLanguagesOffline(): Promise<void> {
    try {
      this.database = await this.dbService.connectDB();
      const resLan = await this.database.executeSql(
        `SELECT * FROM app_languages ORDER BY id ASC`,
        []
      );
      this.languages = [];

      if (resLan.rows.length > 0) {
        for (let i = 0; i < resLan.rows.length; i++) {
          this.languages.push(resLan.rows.item(i));
        }
        console.log('Languages Offline:', this.languages);
      }
    } catch (error) {
      console.error('Error fetching offline languages:', error);
    }
  }

  async checkLanguageSelected() {
    this.lanID = await this.languageService.getCurrentLanguage();
    console.log(this.lanID);
    if (this.lanID === null) {
      this.flashMsg('Please select a language!');
      this.router.navigate(['/user-menu/languages']);
      return;
    }
  }

  async flashMsg(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  getSelectedLanguage() {
    this.storage.get('currentLanguage').then((lan: any) => {
      console.log('Selected Language:', lan);
      this.lanID = lan;
      this.word.lanID = lan;
      this.getWordsList(this.lanID);
    });
  }

  getWordsList(lanId: any) {
    this.http
      .get(this.url + 'get-app-words-bank.php?lanID=' + lanId)
      .subscribe({
        next: (data: any) => {
          this.words = data;
          this.storage.set('wordsList', this.words);
          this.tapWords = this.words?.tapLearn;
          this.bankWords = this.words?.bank;
          console.log(this.tapWords);
        },
        error: (error: any) => {
          console.error('Error fetching languages:', error);
        },
      });
  }

  onLanguageChange(event: any) {
    console.log(event.detail.value);
    this.lanID = event.detail.value;
    this.storage.set('currentLanguage', this.lanID);
    this.getWordsList(this.lanID);
  }

  showBottomCard(data: any, index: any) {
    console.log(data);
    const cardId = data.id;
  }
  showTopCard(data: any, index: any) {
    const card = document.getElementById('front_' + data.id);
    console.log(card, index);
  }

  searchWords(event: any) {
    const evWord = event.detail.value;
    console.log(this.word);
    this.http
      .post(this.url + 'search-app-words-bank.php', this.word)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.words = data;
          this.tapWords = this.words?.tapLearn;
          if (this.words?.bank?.length > 0) {
            this.bankWords = this.words?.bank;
          } else {
            this.bankWords = this.words?.bank;
          }

          if (this.words?.tapLearn?.length > 0) {
            this.tapWords = this.words?.tapLearn;
          } else {
            this.tapWords = this.words?.tapLearn;
          }
          console.log(this.bankWords, this.tapWords);
          if (this.bankWords === 'empty' && this.tapWords === 'empty') {
            this.showMsg = true;
          } else {
            this.showMsg = false;
          }
        },
        error: (error: any) => {
          console.error('Error fetching languages:', error);
        },
      });
  }
}
