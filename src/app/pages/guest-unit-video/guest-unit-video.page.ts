import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-guest-unit-video',
  templateUrl: './guest-unit-video.page.html',
  styleUrls: ['./guest-unit-video.page.scss'],
  standalone: false,
})
export class GuestUnitVideoPage implements OnInit {
  title: any;
  videoPath: any;

  constructor(
    private domSanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
  ) {

    this.activatedRoute.queryParams.subscribe((video: any) => {
      this.title = video?.unitTitle;
      const videoUrl = video?.videUrl;
      console.log(this.title);
      this.playVideo(videoUrl);
    });
   }

  ngOnInit() {
  }

  playVideo(url: string) {
      this.videoPath = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
