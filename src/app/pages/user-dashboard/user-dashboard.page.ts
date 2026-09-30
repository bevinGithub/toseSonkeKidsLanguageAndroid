import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { Capacitor } from '@capacitor/core';

import OneSignal from 'onesignal-cordova-plugin';
import { DatabaseService } from 'src/app/services/database.service';
import { LoadUnitsService } from 'src/app/services/load-units.service';
import { LoadTapLearnService } from 'src/app/services/load-tap-learn.service';
import { LoadFlipLearnService } from 'src/app/services/load-flip-learn.service';
import { LoadWatchLearnService } from 'src/app/services/load-watch-learn.service';
import { LoadSingLearnService } from 'src/app/services/load-sing-learn.service';
import { LoadPracticeTimeService } from 'src/app/services/load-practice-time.service';
import { LoadRhymesPlaylistService } from 'src/app/services/load-rhymes-playlist.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
  standalone: false,
})
export class UserDashboardPage implements OnInit {
  userDeviceID: any;
  url = environment.url;
  DB_TOSE = environment.database;

  database!: SQLiteObject;
  units: any;
  tapLearn: any;
  multipleChoice: any;
  matchingWords: any;

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private toastController: ToastController,
    private dbService: DatabaseService,
    private unitsService: LoadUnitsService,
    private tapLearnService: LoadTapLearnService,
    private flipLearnService: LoadFlipLearnService,
    private watchLearnService: LoadWatchLearnService,
    private singLearnService: LoadSingLearnService,
    private practiceTimeService: LoadPracticeTimeService,
    private rhymesPlaylistService: LoadRhymesPlaylistService
  ) {
    this.storageInit();
  }

  async ngOnInit() {}

  async ionViewWillEnter() {
    //await this.dbConnection();
  }

  async ionViewDidEnter() {
    this.updateOnesignalPlayerID();
    //RUN FUNCTIONS
    await this.dbConnection();
    await this.loadDataOnline();
  }

  async loadDataOnline() {
    await this.loadLanguages();
    await this.unitsService.syncUnits();
    await this.tapLearnService.syncTapLearn();
    await this.flipLearnService.syncFlipLearn();
    await this.watchLearnService.syncWatchLearn();
    await this.singLearnService.syncSingLearn();
    await this.practiceTimeService.syncPracticeTime();
    await this.rhymesPlaylistService.syncRhymesList();
  }

  async storageInit() {
    await this.storage.create();
  }

  updateOnesignalPlayerID() {
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      OneSignal.User.addAlias('external_id', user?.id);
      const postData = {
        userId: user?.id,
      };
      this.http.post(this.url + 'set-onesignal-data.php', postData).subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    });
  }

  async dbConnection() {
    try {
      this.database = await this.dbService.connectDB();
      console.log('Database connection successful!');

      // DELETE TABLE
      // try {
      //   const res = await this.database.executeSql(
      //     `DROP table app_course_units`, []
      //   );
      //   if (res) {
      //     console.log('Unit DB Deleted!');
      //   }
      // } catch (error) {
      //   console.log('Error DB Deleted!');
      // }

      //CREATE TABLE app_languages
      try {
        await this.database.executeSql(
          `CREATE TABLE IF NOT EXISTS app_languages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mysql_id INTEGER UNIQUE,
            language TEXT,
            country TEXT,
            icon TEXT
          )`,
          []
        );
      } catch (error) {
        console.log('Error creating app_languages table:', error);
      }

      //CREATE TABLE app_course_units
      try {
        await this.database.executeSql(
          `CREATE TABLE IF NOT EXISTS app_course_units (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          myunit_id INTEGER UNIQUE,
          lan_id INTEGER,
          unit_number TEXT,
          unit_title TEXT,
          unit_description TEXT,
          unit_objectives TEXT,
          video_url TEXT,
          icon_name TEXT,
          unit_image TEXT,
          unit_image_offline TEXT,
          status TEXT
        )`,
          []
        );
      } catch (error) {
        console.log('Error creating app_course_units table:', error);
      }

      //CREATE TABLE app_tap_learn
      try {
        await this.database.executeSql(
          `CREATE TABLE IF NOT EXISTS app_tap_learn (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          mysql_id INTEGER UNIQUE,
          lan_id INTEGER,
          unit_id INTEGER,
          word_en TEXT,
          word_sh TEXT,
          word_meaning TEXT,
          tap_audio TEXT,
          tap_image TEXT,
          tap_audio_offline TEXT,
          tap_image_offline TEXT,
          word_usage TEXT,
          unit_color TEXT
          )`,
          []
        );
      } catch (error) {
        console.log('Error creating app_tap_learn table:', error);
      }

      //CREATE TABLE app_flip_learn
      try {
        await this.database.executeSql(
          `CREATE TABLE IF NOT EXISTS app_flip_learn (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              mysql_id INTEGER UNIQUE,
              unit_id INTEGER,
              lan_id INTEGER,
              question TEXT,
              flip_image TEXT,
              flip_image_offline TEXT,
              a TEXT,
              b TEXT,
              c TEXT,
              answer TEXT,
              unit_color TEXT
          )`,
          []
        );
      } catch (error) {
        console.log('Error creating app_flip_learn table:', error);
      }

      //CREATE TABLE app_watch_learn
      try {
        await this.database.executeSql(
          `CREATE TABLE IF NOT EXISTS app_watch_learn (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              mysql_id INTEGER UNIQUE,
              unit_id INTEGER,
              lan_id INTEGER,
              video_title TEXT,
              unit_color TEXT,
              video_url TEXT
          )`,
          []
        );
      } catch (error) {
        console.log('Error creating app_watch_learn table:', error);
      }

      //CREATE TABLE app_practice_time
      try {
        await this.database.executeSql(
          `CREATE TABLE IF NOT EXISTS app_practice_time (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              mysql_id INTEGER UNIQUE,
              unit_id INTEGER,
              lan_id INTEGER,
              question TEXT,
              upload_type TEXT,
              image_file TEXT,
              audio_file TEXT,
              image_file_offline TEXT,
              audio_file_offline TEXT,
              a TEXT,
              b TEXT,
              c TEXT,
              answer TEXT,
              unit_color TEXT
          )`,
          []
        );
      } catch (error) {
        console.log('Error creating app_practice_time table:', error);
      }

      //CREATE TABLE app_sing_learn
      try {
        await this.database.executeSql(
          `CREATE TABLE IF NOT EXISTS app_sing_learn (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              mysql_id INTEGER UNIQUE,
              unit_id INTEGER,
              lan_id INTEGER,
              audio_title TEXT,
              unit_color TEXT,
              audio_file TEXT,
              audio_file_offline TEXT
          )`,
          []
        );
      } catch (error) {
        console.log('Error creating app_sing_learn table:', error);
      }

      //CREATE TABLE app_rhymes_list
      try {
        await this.database.executeSql(
          `CREATE TABLE IF NOT EXISTS app_rhymes_list (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              mysql_id INTEGER UNIQUE,
              unit_id INTEGER,
              lan_id INTEGER,
              audio_title TEXT,
              unit_color TEXT,
              audio_file TEXT,
              audio_file_offline TEXT
          )`,
          []
        );
      } catch (error) {
        console.log('Error creating app_rhymes_list table:', error);
      }
    } catch (error) {
      console.log('Database connection failed:', error);
    }
  }

  async connectionMsg(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  //LANGUAGES
  async loadLanguages() {
    try {
      this.database = await this.dbService.connectDB();
      this.http.get(this.url + 'get-app-languages.php').subscribe({
        next: async (resLan: any) => {
          for (const item of resLan) {
            try {
              await this.database.executeSql(
                `INSERT OR IGNORE INTO app_languages
                            (
                                mysql_id,
                                language,
                                country,
                                icon
                            )
                            VALUES (?, ?, ?, ?)`,
                [item.id, item.language, item.country, item.icon]
              );
              console.log('Language Synced!');
            } catch (err) {
              console.log('Language Sync Error', err);
            }
          }
        },
        error: (err: any) => {
          console.log('HTTP Error', err);
        },
      });
      //End HTTP
    } catch (error) {
      console.log('Languages Database connection failed!');
    }
  }
}
