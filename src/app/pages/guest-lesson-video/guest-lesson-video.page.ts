import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-guest-lesson-video',
  templateUrl: './guest-lesson-video.page.html',
  styleUrls: ['./guest-lesson-video.page.scss'],
  standalone: false,
})
export class GuestLessonVideoPage implements OnInit {
  title: any;
  videoPath: any;

  constructor(
    private domSanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
  ) {

    this.activatedRoute.queryParams.subscribe((video: any) => {
      console.log(video);
      this.title = video?.lesson_title;
      const videoUrl = video?.video_url;
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
