import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoadUnitsService {
  database: any;
  url = environment.url;
  constructor(private http: HttpClient, private dbService: DatabaseService) {}

  async syncUnits() {
    try {
      console.log('Starting units sync...');
      if (!this.database) {
        this.database = await this.dbService.connectDB();
      }
      // get online data
      const units: any = await firstValueFrom(
        this.http.get(this.url + 'get-units-offline.php')
      );

      console.log('Units found:', units.length);
      for (const unit of units) {
        try {
          await this.database.executeSql(
            `INSERT OR IGNORE INTO app_course_units
                            (
                                myunit_id,
                                lan_id,
                                unit_number,
                                unit_title,
                                unit_description,
                                unit_objectives,
                                video_url,
                                icon_name,
                                unit_image,
                                status
                            )
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

            [
              unit.id,
              unit.lan_id,
              unit.unit_number,
              unit.unit_title,
              unit.unit_description,
              unit.unit_objectives,
              unit.video_url,
              unit.icon_name,
              unit.unit_image,
              unit.status,
            ]
          );

          // console.log('Unit synced:', unit.unit_title);
        } catch (err) {
          console.log('Unit sync failed:', unit.id, err);
        }
      }

      console.log('Units sync completed');
    } catch (error) {
      console.log('Sync error:', error);
    }
  }
}
