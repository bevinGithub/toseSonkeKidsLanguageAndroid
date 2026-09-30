import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private storage: Storage,
  ) {
    this.storageInit();
  }

  async storageInit() {
    await this.storage.create();
  }

  setCurrentLanguage(language: string) {
    return this.storage.set('currentLanguage', language);
  }

  async getCurrentLanguage() {
    return await this.storage.get('currentLanguage');
  }
}
