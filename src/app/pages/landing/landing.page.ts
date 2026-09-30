import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: false,
})
export class LandingPage implements OnInit {
  name: any;
  surname: any;
  userID: any;
  url = environment.url;

  currentUser: any;
  loggedUser: any;
  constructor(
    private storage: Storage,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.initStorage();
  }

  async ionViewWillEnter() {
    this.loggedUser = await this.getUserSession();
    console.log(this.loggedUser);
    this.userData(this.loggedUser?.id);
    this.lastActivity(this.loggedUser?.id);
  }

  async initStorage() {
    await this.storage.create();
  }

  async getUserSession() {
    this.currentUser = await this.storage.get('currentUser');
    return this.currentUser;
  }


  userData(userId: any) {
    console.log('UserID:', userId)
    this.http.get(this.url + 'get-profile.php?userID=' + userId).subscribe((profile: any) => {
      console.log(profile);
      this.name = profile?.name;
      this.surname = profile?.surname;
    });
  }

  lastActivity(userId: any) {
    const postData = {
      userID: userId
    };
    this.http.post(this.url + 'last-login.php', postData).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

}
