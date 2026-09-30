import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoadSingLearnService {
  database: any;
  url = environment.url;
  constructor(private http: HttpClient, private dbService: DatabaseService) {}

  async syncSingLearn() {
    try {
      console.log('Starting Sing Learn sync...');
      this.database = await this.dbService.connectDB();
      const singLearnData: any = await firstValueFrom(
        this.http.get(this.url + 'sing-learn-offline.php')
      );

      console.log('Sing Learn found:', singLearnData.length);

      for (const item of singLearnData) {
        try {
          await this.database.executeSql(
            `INSERT OR IGNORE INTO app_sing_learn
                            (
                                mysql_id,
                                unit_id,
                                lan_id,
                                audio_title,
                                unit_color,
                                audio_file,
                                audio_file_offline
                            )
                            VALUES (?, ?, ?, ?, ?, ?, ?)`,

            [
              item.id,
              item.unit_id,
              item.lan_id,
              item.audio_title,
              item.unit_color,
              item.audio_file,
              item.audio_file_offline,
            ]
          );
        } catch (err) {
          console.log('Sing Learn Sync Error', err);
        }
      }
    } catch (error) {
      console.log('Database Connection Failed', error);
    }
  }
}
