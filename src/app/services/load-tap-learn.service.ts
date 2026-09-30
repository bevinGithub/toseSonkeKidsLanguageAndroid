import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoadTapLearnService {
  database: any;
  url = environment.url;
  constructor(private http: HttpClient, private dbService: DatabaseService) {}

  async syncTapLearn() {
    try {
      console.log('Starting Tap Learn sync...');
      this.database = await this.dbService.connectDB();
      const tapLearnData: any = await firstValueFrom(
        this.http.get(this.url + 'get-tap-learn-offline.php')
      );

      console.log('Tap & Learn found:', tapLearnData.length);

      for (const item of tapLearnData) {
        try {
          await this.database.executeSql(
            `INSERT OR IGNORE INTO app_tap_learn
                            (
                                mysql_id,
                                lan_id,
                                unit_id,
                                word_en,
                                word_sh,
                                word_meaning,
                                tap_audio,
                                tap_image,
                                tap_audio_offline,
                                tap_image_offline,
                                word_usage,
                                unit_color 
                            )
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

            [
              item.id,
              item.lan_id,
              item.unit_id,
              item.word_en,
              item.word_sh,
              item.word_meaning,
              item.tap_audio,
              item.tap_image,
              item.tap_audio_offline,
              item.tap_image_offline,
              item.word_usage,
              item.unit_color
            ]
          );
          // console.log('Tap & Learn synced:', item.word_en);
        } catch (err) {
          console.log('Tap Learn Sync Error', err);
        }
      }
    } catch (error) {
      console.log('Database Connection Failed', error);
    }
  }
}
