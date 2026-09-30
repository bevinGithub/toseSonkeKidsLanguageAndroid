import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoadRhymesPlaylistService {
  database: any;
  url = environment.url;
  constructor(private http: HttpClient, private dbService: DatabaseService) {}

  async syncRhymesList() {
    try {
      console.log('Starting Rhymes Playlist sync...');
      this.database = await this.dbService.connectDB();
      const rhymesData: any = await firstValueFrom(
        this.http.get(this.url + 'rhymes-playlist-offline.php')
      );

      console.log('Rhymes Playlist found:', rhymesData.length);
      for (const item of rhymesData) {
        try {
          await this.database.executeSql(
            `INSERT OR IGNORE INTO app_rhymes_list
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
          console.log('Rhymes Playlist Sync Error', err);
        }
      }
    } catch (error) {
      console.log('Database Connection Failed', error);
    }
  }
}
