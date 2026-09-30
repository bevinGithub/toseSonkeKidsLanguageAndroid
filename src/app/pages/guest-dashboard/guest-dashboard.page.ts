import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-guest-dashboard',
  templateUrl: './guest-dashboard.page.html',
  styleUrls: ['./guest-dashboard.page.scss'],
  standalone: false,
})
export class GuestDashboardPage implements OnInit {

  constructor(
    private router: Router,
    private storage: Storage,
  ) { }

  ngOnInit() {
  }

  async storageInit() {
    await this.storage.create();
  }

  guestLogout() {
    this.storage.clear();
    this.router.navigate(['/welcome']);
  }

}
