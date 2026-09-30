import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-policy-logged',
  templateUrl: './policy-logged.page.html',
  styleUrls: ['./policy-logged.page.scss'],
  standalone: false,
})
export class PolicyLoggedPage implements OnInit {
  page: any;
  userId: any;
  url = environment.url;
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private loadingController: LoadingController
  ) {
    this.storageInit()
    console.log('Constructor!!!!');
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getTerms();
    console.log('Will Enter!!!!');
  }

  async storageInit() {
    return this.storage.create();
  }

  async getTerms() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();

    this.http.get(this.apiUrl + 'pages/349?_embed=1').subscribe({
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
      },
    });
  }
}
