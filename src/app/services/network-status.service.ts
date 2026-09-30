import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { Device } from '@capacitor/device';
import { AlertController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NetworkStatusService {
  deviceId: any;
  result: any;
  isOnline: boolean = true;
  constructor(
    private router: Router,
    private location: Location,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    // this.connectionStatus();
    // INITIAL CHECK
    this.connectionStatus();
    // START LISTENER
    this.networkEventListener();
  }

  async getNetworkStatus() {
    return await Network.getStatus();
    // return status;
  }

  // checking Network in use
  async getNetworkConnection() {
    const status = await Network.getStatus();
    return status;
  }

  // async connectionStatus() {
  //   const status = await Network.getStatus();
  // }
  // =========================
  // INITIAL CONNECTION CHECK
  // =========================

  async connectionStatus() {
    try {
      const status = await Network.getStatus();
      this.isOnline = status.connected;
      console.log('Initial Network Status:', status);
    } catch (error) {
      console.log('Network Status Error: ', error);
    }
  }

  // =========================
  // NETWORK EVENT LISTENER
  // =========================

  networkEventListener() {
    Network.addListener('networkStatusChange', async (networkStatus) => {
      const { connected, connectionType } = networkStatus;
      this.isOnline = connected;
      console.log('Network Changed:', networkStatus);
      const status = connected
        ? 'Online ✅'
        : 'Offline ❌. Go to Course Units and start learning';
      await this.networkStatusEvent(status, 'top');
    });
  }

  // async networkEventListener() {
  //   await Network.addListener('networkStatusChange', (networkStatus) => {
  //     const { connected, connectionType } = networkStatus;
  //     const status = connected ? 'Online' : 'Offline';
  //     this.networkStatusEvent(status, 'top');
  //   });
  // }
  // =========================
  // TOAST NOTIFICATION
  // =========================

  async networkStatusEvent(
    message: string,
    position: 'top' | 'middle' | 'bottom'
  ) {
    const toast = await this.toastController.create({
      message: 'Your connection is now: ' + message,
      duration: 3000,
      position: position,
      color: message.includes('Offline') ? 'danger' : 'success',
    });

    await toast.present();
  }

  // async networkStatusEvent(message: any, position: any) {
  //   const toast = await this.toastController.create({
  //     message: 'Your connection is: ' + message,
  //     duration: 1500,
  //     position: position,
  //   });

  //   await toast.present();
  // }

  async showNoNetworkAlert() {
    const alert = await this.alertController.create({
      header: 'No Internet',
      message:
        'Watch and Learn needs internet connection to view videos. You will be redirected back.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',

          handler: () => {
            // REDIRECT
            // this.router.navigate(['/dashboard']);
            this.location.back();
          },
        },
      ],
    });

    await alert.present();
  }

  async noConnection() {
    const alert = await this.alertController.create({
      header: 'No Internet',
      message:
        'This section is not supported offline. You will be redirected back to the dashboard.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',

          handler: () => {
            // REDIRECT
            this.router.navigate(['/user-menu/user-dashboard']);
          },
        },
      ],
    });

    await alert.present();
  }

  async getDeviceInfo() {
    const deviceData = await Device.getInfo();
  }

  async getDeviceID() {
    this.result = await Device.getId();
    this.deviceId = this.result?.identifier;
    return this.deviceId;
  }
}
