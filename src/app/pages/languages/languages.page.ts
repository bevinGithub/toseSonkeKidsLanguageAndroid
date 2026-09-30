import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { environment } from 'src/environments/environment';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';
import { NetworkStatusService } from 'src/app/services/network-status.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.page.html',
  styleUrls: ['./languages.page.scss'],
  standalone: false,
})
export class LanguagesPage implements OnInit {
  languages: any;
  offlineLanguages: any;
  connected: any;

  url = environment.url;
  DB_TOSE = environment.database;
  database!: SQLiteObject;
  constructor(
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
    private languageService: LanguageService,
    private networkService: NetworkStatusService,
    private sqlite: SQLite,
    private dbService: DatabaseService
  ) {
    this.storageInit();
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.getLanguageList();
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
      next: async (data: any) => {
        this.languages = data;
      },
      error: (error: any) => {
        console.error('Error fetching languages:', error);
        this.getLanguagesOffline();
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
      this.offlineLanguages = [];

      if (resLan.rows.length > 0) {
        for (let i = 0; i < resLan.rows.length; i++) {
          this.offlineLanguages.push(resLan.rows.item(i));
        }
        console.log('Languages LocalDB:', this.offlineLanguages);
      }
    } catch (error) {
      console.error('Error fetching offline languages:', error);
    }
  }

  async selectLanguage(selected: any) {
    const lanSelected = await this.languageService.setCurrentLanguage(
      selected?.lan
    );
    console.log(lanSelected);
    this.storage.set('currentLanguage', lanSelected);
    if (lanSelected) {
      this.router.navigate(['/user-menu/course-units']);
    }
  }
}
