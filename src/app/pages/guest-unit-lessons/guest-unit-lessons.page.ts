import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-guest-unit-lessons',
  templateUrl: './guest-unit-lessons.page.html',
  styleUrls: ['./guest-unit-lessons.page.scss'],
  standalone: false,
})
export class GuestUnitLessonsPage implements OnInit {
  user: any;
  unitID: any;
  unit: any;
  lessons: any;
  iconName: any;

  emptyNotice: boolean = false;

  url = environment.url;
  constructor(
    private http: HttpClient,
    private router:  Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
  ) {
    this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');
    console.log(this.unitID);
    this.storageInit();
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getUserData()
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
    this.http.get(this.url + `get-guest-course-lessons.php?unitID=${unitId}&userID=${userId}`).subscribe({
      next: (res: any) => {
        console.log(res);
        this.unit = res?.unit;
        this.iconName = this.unit?.icon_name;
        this.lessons = res?.lessons;
        if (this.lessons === 'Empty') {
          this.emptyNotice = true;
        }  else {
          this.emptyNotice = false;
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  viewVideo(data: any) {
    console.log(data?.unit);
    const result = data?.unit;
    const videoData  = {
      unitId: result?.id,
      videUrl: result?.video_url,
      unitTitle: result?.unit_title
    };
    return this.router.navigate(['/guest-unit-video'], {queryParams: videoData});
  }

  viewLesson(data: any) {
    console.log(data);
    const lesson = data?.lesson;
    return this.router.navigate(['/guest-lessons'], {queryParams: data?.lesson});
  }

}
