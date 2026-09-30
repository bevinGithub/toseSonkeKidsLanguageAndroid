import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class LoadPracticeTimeService {
  database: any;
  url = environment.url;
  constructor(private http: HttpClient, private dbService: DatabaseService) {}

  async syncPracticeTime() {
    try {
      console.log('Starting Practice Time sync...');
      this.database = await this.dbService.connectDB();
      const practiceTimeData: any = await firstValueFrom(
        this.http.get(this.url + 'practice-time-offline.php')
      );

      console.log('Practice Time found:', practiceTimeData.length);

      for (const item of practiceTimeData) {
        try {
          await this.database.executeSql(
            `INSERT OR IGNORE INTO app_practice_time
                            (
                                mysql_id,
                                unit_id,
                                lan_id,
                                question,
                                upload_type,
                                image_file,
                                audio_file,
                                image_file_offline,
                                audio_file_offline,
                                a,
                                b,
                                c,
                                answer,
                                unit_color
                            )
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

            [
              item.id,
              item.unit_id,
              item.lan_id,
              item.question,
              item.upload_type,
              item.image_file,
              item.audio_file,
              item.image_file_offline,
              item.audio_file_offline,
              item.a,
              item.b,
              item.c,
              item.answer,
              item.unit_color,
            ]
          );
        } catch (err) {
          console.log('Practice Time Sync Error', err);
        }
      }
    } catch (error) {
      console.log('Database Connection Failed', error);
    }
  }
}
