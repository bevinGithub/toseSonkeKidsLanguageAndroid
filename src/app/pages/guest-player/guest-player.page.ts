import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guest-player',
  templateUrl: './guest-player.page.html',
  styleUrls: ['./guest-player.page.scss'],
  standalone: false,
})
export class GuestPlayerPage implements OnInit {
  video: any;
  videoPath: any;
  url = environment.url;

    constructor(
      private http: HttpClient,
      private domSanitizer: DomSanitizer,
    ) {

     }

    ngOnInit() {
    }

    ionViewWillEnter(){
     this.getActiveVideo();
    }

    getActiveVideo() {
      this.http.get(this.url + 'get-intro-video.php').subscribe({
        next: (data: any) => {
          console.log(data);
          this.video = data;
          this.playVideo(this.video?.video_link);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }

    playVideo(url: string) {
        this.videoPath = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }

}
