import { Injectable } from '@angular/core';
import { SocialLogin } from '@capgo/capacitor-social-login';

@Injectable({
  providedIn: 'root',
})
export class CapgoAuthService {
  resp: any;
  constructor() {
    this.initializeAuth();
  }

  async initializeAuth() {
    await SocialLogin.initialize({
      google: {
        webClientId: '7504422072-2ot5t5ph0gorq3ngcve8u5uv3neeirmf.apps.googleusercontent.com',
      },
    });
  }

  async capGoGoogleSignIn() {
    this.resp = await SocialLogin.login({
      provider: 'google',
      options: {
        scopes: ['email', 'profile'],
        forceRefreshToken: true,
      },
    });
    return this.resp;
  }

  async googleLogout() {
    const options: { provider: 'google' } = {
      provider: 'google',
    };
    await SocialLogin.logout(options);
  }
}
