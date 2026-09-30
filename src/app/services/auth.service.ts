import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isWeb: boolean = false;
  firebase: any;
  public respUser: any;
  auth: any;
  result: any;
  credential: any;
  user: any;
  constructor(private platform: Platform, private router: Router) {
    this.initializeToseApp();
  }

  initializeToseApp() {
    this.isWeb = !(this.platform.is('android') || this.platform.is('ios'));
    console.log(this.isWeb);
    this.firebase = initializeApp(environment.firebaseConfig);
    this.platform.ready().then(() => {});
  }

  async refreshToken() {
    this.auth = getAuth(this.firebase);
    onAuthStateChanged(this.auth, async (currentUser: User | null) => {
      if (currentUser) {
        const idToken = await currentUser.getIdToken(true);
        console.log(idToken);
      } else {
        await this.logout();
      }
    });
  }

  async logout() {
    await getAuth(this.firebase).signOut();
    this.router.navigate(['/signin']);
  }

  async googleSignIn() {
    const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider).then((result: any) => {
        this.result = result;
        this.credential = GoogleAuthProvider.credentialFromResult(this.result);
        const token = this.credential.accessToken;
        this.user = result.user;
        this.respUser = {
          name: this.user.displayName,
          email: this.user.email,
          mobileNumber: this.user.phoneNumber,
          profileImage: this.user.photoURL,
          fbID: this.user.uid,
        };
        this.respUser;
      }, err => {
        console.log(err);
      });
    // try {
    //   const auth = getAuth();
    //   const provider = new GoogleAuthProvider();
    //   const data = await signInWithPopup(auth, provider).then((result: any) => {
    //     this.result = result;
    //     this.credential = GoogleAuthProvider.credentialFromResult(this.result);
    //     const token = this.credential.accessToken;
    //     this.user = result.user;
    //     this.respUser = {
    //       name: this.user.displayName,
    //       email: this.user.email,
    //       mobileNumber: this.user.phoneNumber,
    //       profileImage: this.user.photoURL,
    //       fbID: this.user.uid,
    //     };
    //   });
    //   return data;
    // } catch (error) {
    //   console.log(error);
    // }
  }
}
