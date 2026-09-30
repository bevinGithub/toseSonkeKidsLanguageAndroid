import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {
  userId: any;
  constructor(private storage: Storage) {
    this.storageInit();
    console.log('Constructor!!!!');
  }

  ngOnInit() {}

  ionViewWillEnter(){
    console.log('Will Enter!!!!');
  }

  ionViewDidEnter() {
    console.log('Did Enter!!!!');
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.userId = user?.id;
    });
  }

  async storageInit() {
    return this.storage.create();
  }
}
