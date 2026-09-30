import type { CapacitorConfig } from '@capacitor/cli';
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';

const config: CapacitorConfig = {
  appId: 'com.tosesonkekids',
  appName: 'Tose Sonke Kids',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#D2F4F9',
      showSpinner: false,
      androidSpinnerStyle: 'small',
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      overlaysWebView: false,
      style: 'LIGHT',
      backgroundColor: '#D2F4F9',
    },
    EdgeToEdge: {
      backgroundColor: '#D2F4F9',
    },
  },
};

export default config;
