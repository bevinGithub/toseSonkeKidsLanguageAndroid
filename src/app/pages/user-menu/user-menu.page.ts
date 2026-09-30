import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { CapgoAuthService } from 'src/app/services/capgo-auth.service';
import { CapgoFacbookAuthService } from 'src/app/services/capgo-facbook-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.page.html',
  styleUrls: ['./user-menu.page.scss'],
  standalone: false,
})
export class UserMenuPage implements OnInit {
  pages = [
    {
      title: 'Home',
      url: 'user-dashboard'
    },
    {
      title: 'Languages',
      url: 'languages'
    },
    {
      title: 'Course Units',
      url: 'course-units'
    },
    {
      title: 'Vocabulary Bank',
      url: 'vocabulary-bank'
    },
    {
      title: 'Plans & Pricing',
      url: 'plans'
    },
    {
      title: 'Profile',
      url: 'profile'
    },
    {
      title: 'Settings',
      url: 'settings'
    },
    {
      title: 'Contact Us',
      url: 'contact-us'
    },
    {
      title: 'Delete Account',
      url: 'delete-account'
    }
  ];

  user: any;
  url = environment.url;
  imgUrl = environment.url;

  currentUser: any;
  loggedUser: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private capgoAuthService: CapgoAuthService,
    private capgoFacebookAuthService: CapgoFacbookAuthService,
  ) { }

  ngOnInit() {
    this.initStorage();
  }

  ionViewWillEnter(){
    this.storage.get('currentUser').then((user: any) => {
      const userData = user;
      this.getUserData(userData.id);
    });
  }

  getUserData(userId: any) {
    this.http.get(this.url + 'get-current-user.php?userID=' + userId).subscribe({
      next: (user: any) => {
        this.user = user;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  loadPage(url: any) {
    console.log(url);
    this.router.navigate(['/user-menu/' + url.page]);
  }

  async initStorage() {
    return await this.storage.create();
  }

  logOut() {
    this.storage.get('currentUser').then((data: any) => {
      const logData = { userID: data.ID };
      this.http.post(this.url + 'last-login.php', logData).subscribe((resp: any) => {
        console.log(resp);
      });
    });

    this.storage.clear();
    this.capgoAuthService.googleLogout();
    this.capgoFacebookAuthService.capgoFacebookSignout();
    console.log('User loggedout!');
    this.router.navigate(['/welcome']);
  }

}
