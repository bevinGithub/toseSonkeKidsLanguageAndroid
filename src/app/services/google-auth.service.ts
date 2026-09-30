import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  user: any;
  constructor() {
    this.initializefirebase();
  }

  initializefirebase() {
    const app = initializeApp(environment.firebaseConfig);
  }

  async signinWithGooglePopup() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const userData = await signInWithPopup(auth, provider);
      const user = {
        name: userData?.user.displayName,
        email: userData?.user.email,
        mobile_number: userData?.user.phoneNumber,
        profilePhoto: userData?.user.photoURL,
      };
      return user;
    } catch (error) {
      return null;
    }
  }

  signOutWithGoogle() {
    const auth = getAuth();
    return signOut(auth);
  }
}
