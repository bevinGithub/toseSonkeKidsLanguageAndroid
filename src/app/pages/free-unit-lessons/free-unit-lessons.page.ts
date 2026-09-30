import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-free-unit-lessons',
  templateUrl: './free-unit-lessons.page.html',
  styleUrls: ['./free-unit-lessons.page.scss'],
  standalone: false,
})
export class FreeUnitLessonsPage implements OnInit {
  user: any;
  unitID: any;
  unit: any;
  lessons: any;
  iconName: any;

  lanID: any;

  emptyNotice: boolean = false;

  url = environment.url;
  DB_TOSE = environment.database;
  database!: SQLiteObject;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private sqlite: SQLite,
    private activatedRoute: ActivatedRoute,
    private dbService: DatabaseService
  ) {
    this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');
    console.log(this.unitID);
    this.storageInit();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getUserData();
  }

  async storageInit() {
    await this.storage.create();
  }

  getUserData() {
    this.storage.get('currentUser').then((user: any) => {
      this.user = user;
      this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');
      console.log(this.unitID);
      this.getCourseLessons(this.unitID, this.user?.id);
    });
  }

  getCourseLessons(unitId: string, userId: any) {
    this.http
      .get(
        this.url +
          `get-guest-course-lessons.php?unitID=${unitId}&userID=${userId}`
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.unit = res?.unit;
          this.iconName = this.unit?.icon_name;
          this.lessons = res?.lessons;
          if (this.lessons === 'Empty') {
            this.emptyNotice = true;
          } else {
            this.emptyNotice = false;
          }
        },
        error: (err: any) => {
          console.log(err);
          this.getOfflineLessonsList();
        },
      });
  }

  async getOfflineLessonsList() {
    try {
      // CONNECT DATABASE
      if (!this.database) {
        this.database = await this.dbService.connectDB();
      }
      this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');

      const unitsRes = await this.database.executeSql(
        `SELECT * FROM app_course_units WHERE mysql_id=?`,
        [this.unitID]
      );

      if (unitsRes.rows.length > 0) {
        this.unit = unitsRes.rows.item(0);
        console.log(this.unit);
        this.iconName = this.unit?.icon_name;
        console.log('Icon Name: ', this.iconName);
      }
      const resLessons = await this.database.executeSql(
        `SELECT * FROM app_lessons WHERE unit_id = ? AND lan_id = ? ORDER BY id ASC LIMIT 2`,
        [this.unitID, this.lanID]
      );
      this.lessons = [];
      if (resLessons.rows.length > 0) {
        for (let i = 0; i < resLessons.rows.length; i++) {
          this.lessons.push(resLessons.rows.item(i));
        }
      }
      console.log('LESSONS:', this.lessons);
    } catch (error) {
      console.log('Database error: ', error);
    }
  }

  viewVideo(data: any) {
    console.log(data?.unit);
    const result = data?.unit;
    const videoData = {
      unitId: result?.id,
      videUrl: result?.video_url,
      unitTitle: result?.unit_title,
    };
    return this.router.navigate(['/unit-video'], { queryParams: videoData });
  }

  viewLesson(data: any) {
    console.log(data);
    const lesson = data?.lesson;
    return this.router.navigate(['/lessons'], { queryParams: data?.lesson });
  }
}
