import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoadFlipLearnService {
  database: any;
  url = environment.url;
  constructor(private http: HttpClient, private dbService: DatabaseService) {}

  async syncFlipLearn() {
    try {
      console.log('Starting flip learn sync...');
      if (!this.database) {
        this.database = await this.dbService.connectDB();
      }
      // get online data
      const flipLearnData: any = await firstValueFrom(
        this.http.get(this.url + 'get-flip-learn-offline.php')
      );

      console.log('Flip & Learn found:', flipLearnData.length);
      for (const flip of flipLearnData) {
        try {
          await this.database.executeSql(
            `INSERT OR IGNORE INTO app_flip_learn
                            (
                                mysql_id,
                                lan_id,
                                unit_id,
                                question,
                                flip_image,
                                flip_image_offline,
                                a,
                                b,
                                c,
                                answer,
                                unit_color
                            )
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

            [
              flip.id,
              flip.lan_id,
              flip.unit_id,
              flip.question,
              flip.flip_image,
              flip.flip_image_offline,
              flip.a,
              flip.b,
              flip.c,
              flip.answer,
              flip.unit_color
            ]
          );

          // console.log('Unit synced:', unit.unit_title);
        } catch (err) {
          console.log('Flip learn sync failed:', flip.id, err);
        }
      }
    } catch (error) {
      console.log('Sync error:', error);
    }
  }
}