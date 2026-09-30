import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LanguageService } from 'src/app/services/language.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-guest-course-units',
  templateUrl: './guest-course-units.page.html',
  styleUrls: ['./guest-course-units.page.scss'],
  standalone: false,
})
export class GuestCourseUnitsPage implements OnInit {
  freeUnits: any;
  paidUnits: any
  lanID: any;
  user: any;
  showMsg: boolean = false;
  url = environment.url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private languageService: LanguageService
  ) {

  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.checkLanguageSelected();
  }

  async checkLanguageSelected() {
    this.lanID = await this.languageService.getCurrentLanguage();
    console.log(this.lanID);
    if (this.lanID === null) {
      this.flashMsg('Please select a language!');
      this.router.navigate(['/guest-menu/guest-languages']);
    } else {
      this.getUserData();
    }
  }

  getUserData() {
    this.storage.get('currentUser').then((user: any) => {
      this.user = user;
      this.getCourseUnits(this.user?.id);
    });
  }

  getCourseUnits(userId: any) {
    this.http.get(this.url + 'guest-course-units-list.php?userID=' + userId + '&lanID=' + this.lanID  ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.freeUnits = res?.freeUnit;
        this.paidUnits = res?.paidUnits;
        if (this.freeUnits === 'empty') {
          this.showMsg = true;
          this.freeUnits = [];
        } else {
          this.showMsg = false;
        }
        if (this.paidUnits === 'empty') {
          this.paidUnits = [];
          this.showMsg = true;
        } else {
          this.showMsg = false;
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  notifyGuest() {
    this.toastController.create({
      message: 'Please subscribe to view course units.',
      duration: 2000,
    }).then((loading) => {
      loading.present();
    });
  }

  async flashMsg(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
