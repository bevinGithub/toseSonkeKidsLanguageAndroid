import { Injectable } from '@angular/core';
import { SocialLogin } from '@capgo/capacitor-social-login';

@Injectable({
  providedIn: 'root',
})
export class CapgoFacbookAuthService {
  resp: any;
  constructor() {
    this.initializeAuth();
  }

  async initializeAuth() {
    await SocialLogin.initialize({
      facebook: {
        appId: '1376194076996349',
        clientToken: '4eaf3d5d6d77e9e13a07489467c12598',
      },
    });
  }

  async capGoFacebookSignIn1() {
    this.resp = await SocialLogin.login({
      provider: 'facebook',
      options: {
        permissions: ['email', 'public_profile'],
        limitedLogin: false,
      },
    });
    return this.resp;
  }

  async capGoFacebookSignIn() {
    try {
      const result = await SocialLogin.login({
        provider: 'facebook',
        options: {
          permissions: ['email', 'public_profile'],
          limitedLogin: false,
        },
      });
      console.log('Facebook login result:', result);
      return result;
    } catch (error) {
      console.error('Facebook login error:', error);
      return null;
    }
  }

  // async capGoGoogleSignIn() {
  //   this.resp = await SocialLogin.login({
  //     provider: 'google',
  //     options: {
  //       scopes: ['email', 'profile'],
  //       forceRefreshToken: true,
  //     },
  //   });
  //   return this.resp;
  // }

  async capgoFacebookSignout() {
    const options: { provider: 'facebook' } = {
      provider: 'facebook',
    };
    await SocialLogin.logout(options);
  }
}
