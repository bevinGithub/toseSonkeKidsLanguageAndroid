import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoadWatchLearnService {
  database: any;
  url = environment.url;
  constructor(private http: HttpClient, private dbService: DatabaseService) {}

  async syncWatchLearn() {
    try {
      console.log('Starting Watch Learn sync...');
      this.database = await this.dbService.connectDB();
      const watchLearnData: any = await firstValueFrom(
        this.http.get(this.url + 'watch-learn-offline.php')
      );

      console.log('Watch & Learn found:', watchLearnData.length);

      for (const item of watchLearnData) {
        try {
          await this.database.executeSql(
            `INSERT OR IGNORE INTO app_watch_learn
                            (
                                mysql_id,
                                unit_id,
                                lan_id,
                                video_title,
                                unit_color,
                                video_url 
                            )
                            VALUES (?, ?, ?, ?, ?, ?)`,

            [
              item.id,
              item.unit_id,
              item.lan_id,
              item.video_title,
              item.unit_color,
              item.video_url
            ]
          );
        } catch (err) {
          console.log('Watch Learn Sync Error', err);
        }
      }
    } catch (error) {
      console.log('Database Connection Failed', error);
    }
  }
}
