import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { environment } from 'src/environments/environment';

import { NativeSettings, AndroidSettings } from 'capacitor-native-settings';

import { NetworkStatusService } from 'src/app/services/network-status.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import {
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';

// import { FileTransfer } from '@capacitor/file-transfer';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@ionic/storage-angular';
import { DatabaseService } from 'src/app/services/database.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-course-unit-details',
  templateUrl: './course-unit-details.page.html',
  styleUrls: ['./course-unit-details.page.scss'],
  standalone: false,
})
export class CourseUnitDetailsPage implements OnInit {
  unit: any;
  unitId: any;
  url = environment.url;
  imagePath = environment.imagePath;

  tapLearn: any;
  flipLearn: any;
  watchLearn: any;
  singLearn: any;
  practiceLearn: any;
  rhymesLearn: any;

  fileEvent: any;
  filePath: any;
  filePath2: any;

  filePracticePath: any;
  filePracticePath2: any;

  file: any;
  resourcePath: any;
  resourcePath2: any;
  resourceFlipPath: any;
  resourcePracticePath: any;
  resourcePracticePath2: any;
  resourceSongPath: any;

  connected: any;

  imageRaw: any;
  imageUpdate: any;
  tapRaw: any;
  tapImage: any;
  practiceRaw: any;
  practiceImage: any;

  fileLink = environment.audioPath;

  unitDownloadID: any;

  // new Variables
  tapImageUrl = environment.tapUrl;
  audioTapUrl = environment.audioUrl;
  flipImageUrl = environment.flipImgUrl;
  singAudioUrl = environment.singUrl;
  practiceAudioUrl = environment.practiceUrl;
  rhymesUrl = environment.rhymesUrl;
  unitImagePath = environment.unitImagePath;

  unitLocalImage: any;

  DB_TOSE = environment.database;
  database!: SQLiteObject;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private networkService: NetworkStatusService,
    private sqlite: SQLite,
    private storage: Storage,
    private dbService: DatabaseService
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.unitId = this.activatedRoute.snapshot.paramMap.get('unitID');
    console.log(this.unitId);
    this.getUnitDetails(this.unitId);
  }

  async getUnitDetails(unitId: any) {
    const networkState = await this.networkService.getNetworkConnection();
    this.connected = networkState?.connected;
    console.log('Network State: ', this.connected);
    if (!this.connected) {
      await this.getUnitDetailsOffline(unitId);
      return;
    }
    this.http
      .get(this.url + 'get-course-unit-details.php?unitId=' + unitId)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.unit = res?.unitData;
          this.tapLearn = res?.tapLearn;
          this.flipLearn = res?.flipLearn;
          this.watchLearn = res?.watchLearn;
          this.singLearn = res?.singLearn;
          this.practiceLearn = res?.practiceLearn;
          this.rhymesLearn = res?.rhymesLearn;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  async getUnitDetailsOffline(unitID: any): Promise<void> {
    try {
      // CONNECT DATABASE
      if (!this.database) {
        this.database = await this.dbService.connectDB();
      }
      const resUnit = await this.database.executeSql(
        `SELECT DISTINCT myunit_id,lan_id,unit_number,unit_title,unit_description,unit_objectives,video_url,icon_name,unit_image,unit_image_offline,
        status FROM app_course_units 
        WHERE myunit_id = ?`,
        [unitID]
      );
      console.log('Unit found', resUnit.rows.length);
      if (resUnit.rows.length > 0) {
        this.unit = resUnit.rows.item(0);
        if (this.unit.unit_image_offline) {
          this.unitLocalImage = Capacitor.convertFileSrc(
            this.unit.unit_image_offline
          );
        }
      }
      console.log('Unit Data Offline: ', this.unit);
      //TAP & LEARN
      const resTap = await this.database.executeSql(
        `SELECT * FROM  app_tap_learn WHERE unit_id=? LIMIT 1`,
        [unitID]
      );

      if (resTap.rows.length > 0) {
        this.tapLearn = resTap.rows.item(0);
        console.log('Tap: ', this.tapLearn);
      } else {
        this.tapLearn = 'empty';
      }

      //FLIP & LEARN
      const resFlip = await this.database.executeSql(
        `SELECT * FROM  app_flip_learn WHERE unit_id=? LIMIT 1`,
        [unitID]
      );
      if (resFlip.rows.length > 0) {
        this.flipLearn = resFlip.rows.item(0);
        console.log('flipLearn: ', this.flipLearn);
      } else {
        this.flipLearn = 'empty';
      }

      //WATCH & LEARN
      const resW = await this.database.executeSql(
        `SELECT * FROM  app_watch_learn WHERE unit_id=? LIMIT 1`,
        [unitID]
      );
      if (resW?.rows.length > 0) {
        this.watchLearn = resW.rows.item(0);
        console.log('watchLearn: ', this.watchLearn);
      } else {
        this.watchLearn = 'empty';
      }

      //SING & LEARN
      const resS = await this.database.executeSql(
        `SELECT * FROM  app_sing_learn WHERE unit_id=? LIMIT 1`,
        [unitID]
      );
      if (resS?.rows.length > 0) {
        this.singLearn = resS.rows.item(0);
        console.log('singLearn: ', this.singLearn);
      } else {
        this.singLearn = 'empty';
      }

      //PRACTICE TIME
      const resP = await this.database.executeSql(
        `SELECT * FROM  app_practice_time WHERE unit_id=? LIMIT 1`,
        [unitID]
      );
      if (resP.rows.length > 0) {
        this.practiceLearn = resP.rows.item(0);
        console.log('practiceLearn: ', this.practiceLearn);
      } else {
        this.practiceLearn = 'empty';
      }

      //RHYME PLAYLIST
      const rhymes = await this.database.executeSql(
        `SELECT * FROM  app_rhymes_list WHERE unit_id=? LIMIT 1`,
        [unitID]
      );

      if (rhymes.rows.length > 0) {
        this.rhymesLearn = rhymes.rows.item(0);
        console.log('RhymesList: ', this.rhymesLearn);
      } else {
        this.rhymesLearn = 'empty';
      }
    } catch (error) {
      console.log('Database error: ', error);
    }
  }

  async openActionSheet(data: any) {
    console.log(data);
    const actionSheet = await this.actionSheetController.create({
      header: 'App Settings',
      buttons: [
        {
          text: 'Download Unit Audios and Images',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: async () => {
            console.log('Download Files: ', data);
            try {
              await this.downloadAudioFiles(data);
            } catch (error) {
              console.log('Function Failed: ', error);
            }
          },
        },
        {
          text: 'Manage Device Connection',
          data: {
            action: 'share',
          },
          handler: () => {
            this.openAndroidNativeSettings();
          },
        },
      ],
    });

    await actionSheet.present();
  }

  async downloadAudioFiles(lessonData: any) {
    const unitID = lessonData?.unit_id;
    this.unitDownloadID = lessonData?.unit_id;
    this.storage.set('downloadUnitID', this.unitDownloadID);

    const loading = await this.alertController.create({
      message: 'Please wait will assets are being downloaded!',
    });
    loading.present();

    //TAP DOWNLOAD
    await this.downloadUnitAssets(lessonData);
    await this.downloadTapAssets(lessonData);
    await this.downloadFlipLearnAssets(lessonData);
    await this.downloadSingLearnAssets(lessonData);
    await this.downloadPracticeTimeAssets(lessonData);
    await this.downloadRhymesPlaylistAssets(lessonData);
    loading.dismiss();
  }
  // ===========================================================================
  //  START Unit DOWNLOAD
  // ===========================================================================
  async downloadUnitAssets(lessonData: any) {
    const unitID = lessonData?.unit_id;
    this.unitDownloadID = lessonData?.unit_id;
    this.database = await this.dbService.connectDB();
    const unitData: any = await firstValueFrom(
      this.http.get(
        this.url + 'get-unit-learn-download-file-data.php?unitID=' + unitID
      )
    );
    console.log('Unit Data Info: ', unitData);
    if (unitData) {
      const onlineUnitID = unitData?.id;
      const resUnitSearch = await this.database.executeSql(
        `SELECT DISTINCT myunit_id,lan_id,unit_number,unit_title,unit_description,unit_objectives,video_url,icon_name,unit_image,unit_image_offline,status 
        FROM app_course_units WHERE myunit_id=?`,
        [onlineUnitID]
      );
      if (resUnitSearch.rows.length > 0) {
        const unitResult = resUnitSearch.rows.item(0);
        console.log('Unit Downloading..', unitResult);
        await this.downloadUnitFile(unitResult);
      }
    }
  }

  async downloadUnitFile(unit: any) {
    try {
      if (!Capacitor.isNativePlatform()) {
        return;
      }

      //DOWNLOAD UNIT IMAGE
      if (unit?.unit_image) {
        const originalImageName = unit?.unit_image;
        const encodedImageName = encodeURIComponent(unit?.unit_image);
        console.log('Encoded Image: ', encodedImageName);
        const unitImageUrl = `${this.unitImagePath}${encodedImageName}`;
        console.log('Downloading:', unitImageUrl);

        // download blob
        const blob = await firstValueFrom(
          this.http.get(unitImageUrl, {
            responseType: 'blob',
          })
        );
        // convert to base64
        const base64File = (await this.convertBlobToBase64(blob)) as string;
        const fileImageName = unit?.unit_image.trim().replace(/\s+/g, '_');
        console.log('Local Image Name: ', fileImageName);
        // save
        const fileImageResult = await Filesystem.writeFile({
          path: `images/${fileImageName}`,
          data: base64File,
          // directory: Directory.Data,
          directory: Directory.Documents,
          recursive: true,
        });
        console.log('Unit Image Saved:', fileImageResult.uri);
        try {
          await this.database.executeSql(
            `UPDATE app_course_units SET unit_image_offline=? WHERE myunit_id= ?`,
            [fileImageResult.uri, unit?.myunit_id]
          );
          console.log('Unit Offline Image updated successfully');
        } catch (error) {
          console.log('Error in updating table Unit', error);
        }
      }
    } catch (err) {
      console.log('Download File Error:', err);
    }
  }

  // ===========================================================================
  //  START TAP & LEARN DOWNLOAD
  // ===========================================================================
  async downloadTapAssets(lessonData: any) {
    const unitID = lessonData?.unit_id;
    this.unitDownloadID = lessonData?.unit_id;
    this.database = await this.dbService.connectDB();
    const tapAudios: any = await firstValueFrom(
      this.http.get(
        this.url + 'get-tap-learn-download-files.php?unitID=' + unitID
      )
    );

    for (const tap of tapAudios) {
      try {
        const OnlineTapID = tap?.id;
        const resTap = await this.database.executeSql(
          `SELECT DISTINCT mysql_id,lan_id,unit_id,word_en,word_sh,word_meaning,tap_audio,tap_image,tap_audio_offline,tap_image_offline,word_usage,unit_color 
            FROM app_tap_learn WHERE mysql_id=?`,
          [OnlineTapID]
        );
        if (resTap.rows.length > 0) {
          const tapData = resTap.rows.item(0);
          await this.downloadTapFile(tapData);
        }
      } catch (error: any) {
        console.log('Loop Error:', error);
      }
    }
  }

  //DOWNLOAD FILES INDIVIDUALLY
  async downloadTapFile(tap: any) {
    try {
      if (!Capacitor.isNativePlatform()) {
        return;
      }

      //DOWNLOAD AUDIO
      if (tap?.tap_audio) {
        const tapOriginalAudio = tap?.tap_audio;
        const encodedAudioName = encodeURIComponent(tap?.tap_audio);
        const tapAudioUrl = `${this.audioTapUrl}${encodedAudioName}`;
        console.log('Downloading:', tapAudioUrl);

        // download blob
        const blob = await firstValueFrom(
          this.http.get(tapAudioUrl, {
            responseType: 'blob',
          })
        );

        // convert to base64
        const base64File = (await this.convertBlobToBase64(blob)) as string;
        const audioFileName = tapOriginalAudio.trim().replace(/\s+/g, '_');
        console.log('Audio Formatted: ', audioFileName);
        // save file
        const fileTapAudioResult = await Filesystem.writeFile({
          path: `audios/${audioFileName}`,
          data: base64File,
          // directory: Directory.Data,
          directory: Directory.Documents,
          recursive: true,
        });

        console.log('Saved:', fileTapAudioResult.uri);
        try {
          await this.database.executeSql(
            `UPDATE app_tap_learn SET tap_audio_offline=? WHERE mysql_id= ?`,
            [fileTapAudioResult.uri, tap?.mysql_id]
          );
          console.log('Tap Audio updated successfully');
        } catch (error) {
          console.log('Error in updating table Tap and Learn', error);
        }
      }

      //DOWNLOAD TAP IMAGE
      if (tap?.tap_image) {
        const tap_image = tap?.tap_image;
        const encodedImageName = encodeURIComponent(tap?.tap_image);
        const tapImageUrl = `${this.tapImageUrl}${encodedImageName}`;
        console.log('Downloading:', tapImageUrl);

        // download blob
        const blob = await firstValueFrom(
          this.http.get(tapImageUrl, {
            responseType: 'blob',
          })
        );
        // convert to base64
        const base64File = (await this.convertBlobToBase64(blob)) as string;
        const originImageName = tap_image.trim().replace(/\s+/g, '_');
        console.log('Original Image', originImageName);
        // save file
        const fileImageResult = await Filesystem.writeFile({
          path: `images/${originImageName}`,
          data: base64File,
          // directory: Directory.Data,
          directory: Directory.Documents,
          recursive: true,
        });
        console.log('Saved:', fileImageResult.uri);
        try {
          await this.database.executeSql(
            `UPDATE app_tap_learn SET tap_image_offline=? WHERE mysql_id= ?`,
            [fileImageResult.uri, tap?.mysql_id]
          );
          console.log('Tap Offline Image updated successfully');
        } catch (error) {
          console.log('Error in updating table Tap and Learn', error);
        }
      }
    } catch (err) {
      console.log('Download File Error:', err);
    }
  }
  // ==================================================================================================================================
  //  END TAP & LEARN DOWNLOAD
  // ==================================================================================================================================

  // ==================================================================================================================================
  //  START FLIP & LEARN DOWNLOAD
  // ==================================================================================================================================
  async downloadFlipLearnAssets(lessonData: any) {
    const unitID = lessonData?.unit_id;
    console.log('Unit ID', this.unitDownloadID);
    const flipAssets: any = await firstValueFrom(
      this.http.get(
        this.url + 'get-flip-learn-download-files.php?unitID=' + unitID
      )
    );
    console.log('Flip Learn Offline: ', flipAssets);
    for (const flipOnline of flipAssets) {
      try {
        const flipID = flipOnline?.id;
        const resFlip = await this.database.executeSql(
          `SELECT DISTINCT mysql_id,unit_id,lan_id,question,flip_image,flip_image_offline,a,b,c,answer,unit_color 
          FROM app_flip_learn WHERE mysql_id=?`,
          [flipID]
        );
        if (resFlip.rows.length > 0) {
          const flipData = resFlip.rows.item(0);
          await this.downloadFlipImage(flipData);
        }
      } catch (error: any) {
        console.log('Loop Error:', error);
      }
    }
  }

  async downloadFlipImage(flip: any) {
    try {
      if (!Capacitor.isNativePlatform()) {
        return;
      }
      //DOWNLOAD FLIP IMAGE
      if (flip?.flip_image) {
        const originalFlipImage = flip?.flip_image;
        const flipImageFile = flip?.flip_image;
        const encodedImageName = encodeURIComponent(flipImageFile);
        const flipImageUrl = `${this.flipImageUrl}${encodedImageName}`;
        console.log('Downloading:', flipImageUrl);

        // download blob
        const blob = await firstValueFrom(
          this.http.get(flipImageUrl, {
            responseType: 'blob',
          })
        );
        // convert to base64
        const base64File = (await this.convertBlobToBase64(blob)) as string;
        const fileImageName = originalFlipImage.trim().replace(/\s+/g, '_');
        const fileImageResult = await Filesystem.writeFile({
          path: `images/${fileImageName}`,
          data: base64File,
          // directory: Directory.Data,
          directory: Directory.Documents,
          recursive: true,
        });

        console.log('Saved:', fileImageResult.uri);
        try {
          await this.database.executeSql(
            `UPDATE app_flip_learn SET flip_image_offline=? WHERE mysql_id= ?`,
            [fileImageResult.uri, flip?.mysql_id]
          );
          console.log('Flip Offline Image updated successfully');
        } catch (error) {
          console.log('Error in updating table Flip and Learn', error);
        }
      }
    } catch (err) {
      console.log('Download File Error:', err);
    }
  }
  // =======================================================================================
  //  END FLIP & LEARN DOWNLOAD
  // =======================================================================================

  // =======================================================================================
  //  START SING & LEARN DOWNLOAD
  // =======================================================================================
  async downloadSingLearnAssets(lessonData: any) {
    const unitID = lessonData?.unit_id;
    const singAssets: any = await firstValueFrom(
      this.http.get(
        this.url + 'get-sign-learn-download-files.php?unitID=' + unitID
      )
    );

    for (const sing of singAssets) {
      try {
        const onlineSingID = sing?.id;
        const resSing = await this.database.executeSql(
          `SELECT DISTINCT mysql_id,unit_id,lan_id,audio_title,unit_color,audio_file,audio_file_offline 
          FROM app_sing_learn WHERE mysql_id=?`,
          [onlineSingID]
        );
        if (resSing.rows.length > 0) {
          const singData = resSing.rows.item(0);
          await this.downloadSingAudio(singData);
        }
      } catch (error: any) {
        console.log('Loop Error:', error);
      }
    }
  }

  async downloadSingAudio(sing: any) {
    try {
      if (!Capacitor.isNativePlatform()) {
        return;
      }
      //DOWNLOAD AUDIO
      if (sing?.audio_file) {
        const sing_audio = sing?.audio_file;
        const encodedAudioFileName = encodeURIComponent(sing?.audio_file);
        const singAudioUrl = `${this.singAudioUrl}${encodedAudioFileName}`;
        console.log('Downloading:', singAudioUrl);

        // download blob
        const blob = await firstValueFrom(
          this.http.get(singAudioUrl, {
            responseType: 'blob',
          })
        );

        // convert to base64
        const base64File = await this.convertBlobToBase64(blob) as string;
        const audioFileName = sing_audio.trim().replace(/\s+/g, '_');
        // save file
        const fileResult = await Filesystem.writeFile({
          path: `audios/${audioFileName}`,
          data: base64File,
          // directory: Directory.Data,
          directory: Directory.Documents,
          recursive: true,
        });

        console.log('Saved:', fileResult.uri);
        try {
          await this.database.executeSql(
            `UPDATE app_sing_learn SET audio_file_offline=? WHERE mysql_id= ?`,
            [fileResult.uri, sing?.mysql_id]
          );
          console.log('Sing & Learn Audio updated successfully');
        } catch (error) {
          console.log('Error in updating table Sing & Learn', error);
        }
      }
    } catch (err) {
      console.log('Download File Error:', err);
    }
  }
  // =======================================================================================
  //  END SING & LEARN DOWNLOAD
  // =======================================================================================

  // =======================================================================================
  //  START PRACTICE TIME DOWNLOAD
  // =======================================================================================

  async downloadPracticeTimeAssets(lessonData: any) {
    const unitID = lessonData?.unit_id;
    this.unitDownloadID = lessonData?.unit_id;
    const practiceAssets: any = await firstValueFrom(
      this.http.get(
        this.url + 'get-practice-time-download-files-2.php?unitID=' + unitID
      )
    );

    for (const practice of practiceAssets) {
      try {
        const onlinePracticeID = practice?.id;
        const resPractice = await this.database.executeSql(
          `SELECT DISTINCT mysql_id,unit_id,lan_id,question,upload_type,image_file,audio_file,image_file_offline,
            audio_file_offline,a,b,c,answer,unit_color 
            FROM app_practice_time WHERE mysql_id=?`,
          [onlinePracticeID]
        );
        if (resPractice.rows.length > 0) {
          const practiceData = resPractice.rows.item(0);
          await this.downloadPracticeAudio(practiceData);
        }
      } catch (error: any) {
        console.log('Loop Error:', error);
      }
    }
  }

  async downloadPracticeAudio(practice: any) {
    try {
      if (!Capacitor.isNativePlatform()) {
        return;
      }

      //DOWNLOAD PRACTICE IMAGE
      if (practice?.image_file) {
        const image_file = practice?.image_file;
        const encodedImageName = encodeURIComponent(practice?.image_file);
        const practiceImageUrl = `${this.practiceAudioUrl}${encodedImageName}`;
        console.log('Downloading:', practiceImageUrl);

        const blob = await firstValueFrom(
          this.http.get(practiceImageUrl, {
            responseType: 'blob',
          })
        );
        // convert to base64
        const base64File = (await this.convertBlobToBase64(blob)) as string;
        const fileImageName = image_file.trim().replace(/\s+/g, '_');
        const fileImageResult = await Filesystem.writeFile({
          path: `images/${fileImageName}`,
          data: base64File,
          // directory: Directory.Data,
          directory: Directory.Documents,
          recursive: true,
        });
        console.log('Saved:', fileImageResult.uri);
        try {
          await this.database.executeSql(
            `UPDATE app_practice_time SET image_file_offline=? WHERE mysql_id= ?`,
            [fileImageResult.uri, practice?.mysql_id]
          );
          console.log('Practice Time Offline Image updated successfully');
        } catch (error) {
          console.log('Error in updating table Practice Time', error);
        }
      }

      //DOWNLOAD AUDIO
      if (practice?.audio_file) {
        const practice_audio = practice?.audio_file;
        const encodedAudioFileName = encodeURIComponent(practice?.audio_file);
        const practiceAudioUrl = `${this.practiceAudioUrl}${encodedAudioFileName}`;
        console.log('Downloading:', practiceAudioUrl);

        // download blob
        const blob = await firstValueFrom(
          this.http.get(practiceAudioUrl, {
            responseType: 'blob',
          })
        );

        // convert to base64
        const base64File = (await this.convertBlobToBase64(blob)) as string;
        const audioFileName = practice_audio.trim().replace(/\s+/g, '_');
        const fileResult = await Filesystem.writeFile({
          path: `audios/${audioFileName}`,
          data: base64File,
          // directory: Directory.Data,
          directory: Directory.Documents,
          recursive: true,
        });

        console.log('Saved:', fileResult.uri);
        try {
          await this.database.executeSql(
            `UPDATE app_practice_time SET audio_file_offline=? WHERE mysql_id= ?`,
            [fileResult.uri, practice?.mysql_id]
          );
          console.log('Practice Time Audio updated successfully');
        } catch (error) {
          console.log('Error in updating table Practice Time', error);
        }
      }
    } catch (err) {
      console.log('Download File Error:', err);
    }
  }
  // =======================================================================================
  //  END PRACTICE TIME DOWNLOAD
  // =======================================================================================
  // =======================================================================================
  //  START RHYMES PLAYLIST DOWNLOAD
  // =======================================================================================
  async downloadRhymesPlaylistAssets(lessonData: any) {
    const unitID = lessonData?.unit_id;
    this.unitDownloadID = lessonData?.unit_id;
    const rhymesAssets: any = await firstValueFrom(
      this.http.get(
        this.url + 'get-rhymes-playlist-download-files.php?unitID=' + unitID
      )
    );

    for (const playlist of rhymesAssets) {
      try {
        const onlineRhymeID = playlist?.id;
        const resRhyme = await this.database.executeSql(
          `SELECT DISTINCT mysql_id,unit_id,lan_id,audio_title,unit_color,audio_file,audio_file_offline 
          FROM app_rhymes_list WHERE mysql_id=?`,
          [onlineRhymeID]
        );
        if (resRhyme.rows.length > 0) {
          const rhymeData = resRhyme.rows.item(0);
          await this.downloadRhymesAudio(rhymeData);
        }
      } catch (error: any) {
        console.log('Loop Error:', error);
      }
    }
  }

  async downloadRhymesAudio(rhymes: any) {
    try {
      if (!Capacitor.isNativePlatform()) {
        return;
      }
      //DOWNLOAD AUDIO
      if (rhymes?.audio_file) {
        const rhymes_audio = rhymes?.audio_file;
        const encodedAudioFileName = encodeURIComponent(rhymes?.audio_file);
        const rhymeAudioUrl = `${this.rhymesUrl}${encodedAudioFileName}`;
        console.log('Downloading:', rhymeAudioUrl);
        // download blob
        const blob = await firstValueFrom(
          this.http.get(rhymeAudioUrl, {
            responseType: 'blob',
          })
        );
        // convert to base64
        const base64File = (await this.convertBlobToBase64(blob)) as string;
        const audioFileName = rhymes_audio.trim().replace(/\s+/g, '_');
        const fileResult = await Filesystem.writeFile({
          path: `audios/${audioFileName}`,
          data: base64File,
          // directory: Directory.Data,
          directory: Directory.Documents,
          recursive: true,
        });

        console.log('Saved:', fileResult.uri);
        try {
          await this.database.executeSql(
            `UPDATE app_rhymes_list SET audio_file_offline=? WHERE mysql_id= ?`,
            [fileResult.uri, rhymes?.mysql_id]
          );
          console.log('Rhymes Audio updated successfully');
        } catch (error) {
          console.log('Error in updating table Rhymes Playlist', error);
        }
      }
    } catch (err) {
      console.log('Download File Error:', err);
    }
  }

  // BLOB BASE64
  private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  // =======================================================================================
  //  END RHYMES PLAYLIST DOWNLOAD
  // =======================================================================================
  async openAndroidNativeSettings() {
    const alert = await this.alertController.create({
      header: 'Process Flow Notice',
      message:
        'Once you switch off your mobile data and wifi, please go to course units or home to load offline content',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Continue',
          role: 'confirm',
        },
      ],
    });

    await alert.present();
    // WAIT UNTIL USER CLICKS OK
    await alert.onDidDismiss();

    console.log('Ok Pressed Open Settings');
    NativeSettings.openAndroid({
      option: AndroidSettings.Settings,
    });
  }

  async flashNotice(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  ionViewWillLeave() {}
}
