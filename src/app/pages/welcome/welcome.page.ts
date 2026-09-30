import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { CapgoAuthService } from 'src/app/services/capgo-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: false,
})
export class WelcomePage implements OnInit {
  googleUser: any;
  gProfile: any;
  facebookUser: any;
  dataUser: any;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private alertController: AlertController,
    private capgoAuthService: CapgoAuthService
  ) {}

  ngOnInit() {}

}
