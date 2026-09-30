import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-terms-logged',
  templateUrl: './terms-logged.page.html',
  styleUrls: ['./terms-logged.page.scss'],
  standalone: false,
})
export class TermsLoggedPage implements OnInit {
  page: any;
  url = environment.url;
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getTerms();
  }

    async getTerms() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();

    this.http.get(this.apiUrl + 'pages/347?_embed=1').subscribe({
      next: (data: any) => {
        this.page = data;
        console.log(this.page);
        if (this.page) {
          loading.dismiss();
        } else {
          loading.dismiss();
        }
      },
      error: (err: any) => {
        console.log(err);
        loading.dismiss();
      }
    })
  }

  async getTerms2() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();

    this.http.get(this.url + 'get-terms.php').subscribe({
      next: (data: any) => {
        this.page = data;
        if (this.page) {
          loading.dismiss();
        } else {
          loading.dismiss();
        }
      },
      error: (err: any) => {
        console.log(err);
        loading.dismiss();
      },
    });
  }
}
