import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
  standalone: false,
})
export class ContactUsPage implements OnInit {
  service: any;
  services: any = {};
  state: any;
  loggedUser: any;
  currentUser: any;
  validEmail: boolean = false;
  user: any;
  data: any;

  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.storageInit();
  }

  ngOnInit() {

  }

  async ionViewWillEnter(){
    this.loggedUser = await this.getUserSession();
    this.services = this.loggedUser;
    this.getUserData(this.loggedUser?.id);
  }

  async getUserData(userId: any) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();
    this.http.get(this.url + 'get-current-user.php?userID=' + userId).subscribe({
      next: (res: any) => {
        this.services.first_name = res?.name;
        this.services.last_name = res?.surname;
        this.services.phone_number = res?.mobile_number;
        this.services.email = res?.email;
        loading.dismiss();
      },
      error: (err: any) => {
        loading.dismiss();
      }
    });
  }

  async storageInit() {
    await this.storage.create();
  }

  getUserSession() {
    this.currentUser =  this.storage.get('currentUser');
    return this.currentUser;
  }

  async submitEnquiry() {
    const loading = await this.loadingController.create({ message: 'Please wait...' });
    loading.present();

    this.http.post(this.url + 'send-enquiry.php', this.services).subscribe({
      next: (res: any) => {
        console.log(res);
        this.state = res;
        if (this.state?.status === 'success') {
          loading.dismiss();
          this.systemNotice('Enquiry has been successfully submitted!');
          this.router.navigate(['/user-menu/user-dashboard'])
        }
        if (this.state?.status === 'error') {
          loading.dismiss();
          this.systemNotice('Enquiry could not be successfully submitted!');
        }
      },
      error: (error) =>{
        loading.dismiss();
        this.systemNotice('Enquiry could not be successfully submitted!' + JSON.stringify(error));
      }
    });
  }

  checkEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.services.email)) {
      console.log('Email valid');
      this.validEmail = true;
    } else {
      console.log('Not Email valid');
      this.validEmail = false;
    }
    console.log(this.validEmail);
  }

  async systemNotice(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}
