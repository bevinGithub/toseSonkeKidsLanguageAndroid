import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LanguageService } from 'src/app/services/language.service';
import { environment } from 'src/environments/environment';

import { NetworkStatusService } from 'src/app/services/network-status.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-course-units',
  templateUrl: './course-units.page.html',
  styleUrls: ['./course-units.page.scss'],
  standalone: false,
})
export class CourseUnitsPage implements OnInit {
  units: any;
  user: any;
  lanID: any;
  showMsg: boolean = false;
  subscriptionData: any;
  subscriptionActive: any;
  isSubscriptionActive: boolean = false
  isPaid: boolean = false;
  isFree: boolean = false;
  
  freeUnits: any;
  paidUnits: any;

  offlineUnits: any;
  offlineFreeUnits: any;
  offlinePaidUnits: any;
  
  netStatus: any;
  connected: any;

  userSubscriptionStatus: any;

  url = environment.url;
  DB_TOSE = environment.database;
  database!: SQLiteObject;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private languageService: LanguageService,
    private networkStatusService: NetworkStatusService,
    private sqlite: SQLite,
    private dbService: DatabaseService,
  ) {
    this.storageInit();
  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.checkLanguageSelected();
    this.currentUserData();
    this.netStatus = await this.networkStatusService.getNetworkConnection();
    this.connected = this.netStatus.connected;
    console.log('Network Connected: ', this.connected);
  }

  async storageInit() {
    await this.storage.create();
  }

  currentUserData()  {
    this.storage.get('currentUser').then((user: any) => {
      this.user = user;
      this.userSubscriptionStatus = this.user?.subscriptionActive;
    });
  }

  async offlinePaidCourseUnits() {
    try {
      this.database = await this.dbService.connectDB();
      console.log('User Subscription Status:', this.userSubscriptionStatus);
      console.log('Offline Language Selected:', this.lanID);

      const courseResults = await this.database.executeSql(
        `SELECT * FROM app_course_units WHERE lan_id=? ORDER BY id ASC`,
        [this.lanID]
      );

      this.offlineUnits = [];
      if (courseResults.rows.length > 0) {
        for (let a = 0; a < courseResults.length; a++) {
          this.offlineUnits.push(courseResults.rows.item(a));
        }
        console.log('Offline Courses Units:', this.offlineUnits);
      }
      
      
      this.showMsg = this.offlineUnits.length === 0;
      // subscription logic
      this.isSubscriptionActive = this.userSubscriptionStatus === 'Active';
      this.isPaid = this.isSubscriptionActive;
      this.isFree = !this.isSubscriptionActive;
     
    } catch (error) {
      console.log("Database connection failed: ", error);
      // this.offlineUnits = [];
      this.showMsg = true;
      this.isSubscriptionActive = false;
      this.isPaid = false;
      this.isFree = true;
    }
  }

  //OFFLINE  FREE COURSE UNITS
  async offlineFreeCourseUnits() {
    try {
      this.database = await this.dbService.connectDB();
      console.log('User Subscription Status:', this.userSubscriptionStatus);
      console.log('Language Selected:', this.lanID);

      const isActive = this.userSubscriptionStatus === 'Active';
      this.isSubscriptionActive = isActive;
      this.isPaid = isActive;
      this.isFree = !isActive;

      // FREE UNITS (Unit 1)
      const freeRes = await this.database.executeSql(
        `SELECT * FROM app_course_units WHERE lan_id=? LIMIT 1`,
        [this.lanID]
      );

      this.offlineFreeUnits = freeRes.rows.length ? [freeRes.rows.item(0)] : [];
      console.log('Offline Free Course Units:', this.offlineFreeUnits);

      //PAID UNITS (EVERYTHING EXCEPT UNIT 1)
      const paidRes = await this.database.executeSql(
        `SELECT * FROM app_course_units WHERE unit_number != 'Unit 1' AND lan_id=? ORDER BY id ASC`,
        [this.lanID]
      );

      this.offlinePaidUnits = [];
      for (let i = 0; i < paidRes.rows.length; i++) {
        this.offlinePaidUnits.push(paidRes.rows.item(i));
      }
      console.log('Offline Paid Course Units:', this.offlinePaidUnits);
      // MESSAGE LOGIC (single source of truth)
      this.showMsg =
        this.offlineFreeUnits.length === 0 &&
        this.offlinePaidUnits.length === 0;
    } catch(error) {
      console.log("Database Connection error: ", error);

      this.offlineFreeUnits = [];
      this.offlinePaidUnits = [];
      this.showMsg = true;
    }
  }

  offlineFreeCourseUnitsOld() {
    try {
      this.sqlite.create({
        name: this.DB_TOSE,
        location: 'default'
      }).then((db: SQLiteObject) => {
          this.database = db;
          this.database.executeSql(`SELECT * FROM app_course_units WHERE unit_number != 'Unit 1' AND lan_id=?`, [this.lanID]).then((res: any) =>{
            if (res.rows.length > 0) {
              this.offlinePaidUnits = [];
              for(let u=0; u < res.length; u++) {
                this.offlinePaidUnits.push(res.rows.item(u));
              }
              console.log(this.offlinePaidUnits);
              if (this.offlinePaidUnits?.length === 0) {
                this.showMsg = true;
              } else {
                this.showMsg = false;
              }
            }
            if (this.userSubscriptionStatus === 'Active') {
              this.isSubscriptionActive = true;
              this.isPaid = true;
              this.isFree = false;
            } else {
              this.isSubscriptionActive = false;
              this.isPaid = false;
              this.isFree = true;
            }
          })
          .then((err: any) => {
            console.log(err);
          });

          const unitNumber = 'Unit 1';
          this.database.executeSql(`SELECT * FROM app_course_units WHERE unit_number=? AND lan_id=?`, [unitNumber, this.lanID]).then((resF: any) => {
            console.log(resF);
            if (resF.rows.length > 0) {
              this.offlineFreeUnits = [];
              for(let f=0; f < resF.length; f++) {
                this.offlineFreeUnits.push(resF.rows.item(f));
              }
              console.log(this.offlineFreeUnits);
              if (this.offlineFreeUnits?.length === 0) {
                this.showMsg = true;
              } else {
                this.showMsg = false;
              }
            }
            this.isSubscriptionActive = false;
            this.isPaid = false;
            this.isFree = true;
          })
          .catch((err: any) => {
            console.log(err);
          })
      })
    } catch (error: any) {
      console.log(error);
    }
  }

 async checkLanguageSelected() {
    this.lanID = await this.languageService.getCurrentLanguage();
    console.log(this.lanID);
    if (this.lanID === null) {
      this.flashMsg('Please select a language!');
      this.router.navigate(['/user-menu/languages']);
    } else {
      this.getUserData();
    }
  }

  async getUserData() {
    this.storage.get('currentUser').then((user: any) => {
      this.user = user;
      this.checkUserSubscriptionStatus(this.user?.id);
      this.getCourseUnits(this.user?.id);
      this.getFreeCourseUnits(this.user?.id);

      //OFFLINE CHECK
      if (this.netStatus.connected) {
        console.log('Network Status: ',this.netStatus.connected);
        this.subscriptionData = user;
        this.subscriptionActive = this.subscriptionData?.subscriptionActive;
        if (this.subscriptionActive === 'Active') {
          this.isSubscriptionActive = true;
          this.isPaid = true;
          this.isFree = false;
        } else {
          this.isSubscriptionActive = false;
          this.isPaid = false;
          this.isFree = true;
        }
      }
    });
  }

  checkUserSubscriptionStatus(userId: any) {
    this.http.get(this.url + 'subscription-status-check.php?userID=' + userId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.subscriptionData = res;
        this.subscriptionActive = this.subscriptionData?.subscriptionActive;
        if (this.subscriptionActive === 'Active') {
          this.isSubscriptionActive = true;
          this.isPaid = true;
          this.isFree = false;
        } else {
          this.isSubscriptionActive = false;
          this.isPaid = false;
          this.isFree = true;
        }
        console.log('Subscription: ', this.subscriptionActive);
        
      },
      error: (err: any) => {
        console.log(err);
      }
    });
   }

  getFreeCourseUnits(userId: any) {
    this.http.get(this.url + 'guest-course-units-list.php?userID=' + userId + '&lanID=' + this.lanID  ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.storage.set('freeCourseUnits', res);
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
        console.log('Get Free Courses', err);
      }
    })
  }

  async getCourseUnits(userId: any) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();
    this.netStatus = await this.networkStatusService.getNetworkStatus();
    console.log('Network Status: ', this.netStatus.connected);
    //OFFLINE DATA
    if (!this.netStatus.connected) {
      console.log('No internet - loading offline data');
      loading.dismiss();
      this.offlinePaidCourseUnits();
      this.offlineFreeCourseUnits();
      return;
    }
    //ONLINE DATA
    this.http.get(this.url + 'course-units-list.php?userID=' + userId + '&lanID=' + this.lanID ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.storage.set('paidCourseUnits', res);
        this.units = res;
        if (this.units === null) {
          this.showMsg = true;
        } else {
          this.showMsg = false;
        }
        loading.dismiss();
      },
      error: (err: any) => {
        console.log('Get Offline', err);
        loading.dismiss();
      }
    })
  }

  async flashMsg(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "primary",
      icon: "checkmark-done-outline",
    });
    toast.present();
  }

  async checkPaidUnits() {
    const alert = await this.alertController.create({
      header: 'Subscribe',
      message: 'For full access, please subscribe.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Subscribe',
          handler: () => {
            this.router.navigate(['/user-menu/plans'])
          }
        }
      ]
    });
    await alert.present();
  }

}
