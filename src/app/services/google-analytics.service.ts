import { Injectable } from '@angular/core';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor() {}

  setCollectionEnabled(enabled: boolean) {
    FirebaseAnalytics.setCollectionEnabled({
      enabled: enabled,
    });
  }

  setScreenName(screenName: string) {
    FirebaseAnalytics.setScreenName({
      screenName: screenName,
      nameOverride: screenName,
    });
  }
}
