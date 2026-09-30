import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { LanguageService } from 'src/app/services/language.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-guest-languages',
  templateUrl: './guest-languages.page.html',
  styleUrls: ['./guest-languages.page.scss'],
  standalone: false,
})
export class GuestLanguagesPage implements OnInit {
  languages: any

  url = environment.url;
  constructor(
    private  router: Router,
    private http: HttpClient,
    private lannguageService: LanguageService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getLanguagList()
  }

  getLanguagList() {
    this.http.get(this.url + 'get-app-languages.php').subscribe({
      next: (data: any) => {
        this.languages = data;
      },
      error: (error: any) => {
        console.error('Error fetching languages:', error);
      },
    });
  }

  async selectLanguage(selected: any) {
    const lanSelected = await this.lannguageService.setCurrentLanguage(selected?.lan);
    console.log(lanSelected);
    if (lanSelected) {
      this.router.navigate(['/guest-menu/guest-course-units']);
    }
  }

}
