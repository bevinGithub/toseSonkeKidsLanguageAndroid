import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-guest-lessons',
  templateUrl: './guest-lessons.page.html',
  styleUrls: ['./guest-lessons.page.scss'],
  standalone: false,
})
export class GuestLessonsPage implements OnInit {
  lesson: any;
  url = environment.url;
  taps: any;
  cultures: any;
  reviewsMC: any;
  reviewsMW: any;
  practices: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {
    this.activatedRoute.queryParams.subscribe((lesson: any) => {
      console.log(lesson);
      this.lesson = lesson;
      this.getLessonsSections(this.lesson?.id);
    });
  }

  ngOnInit() {
  }

  viewVideo(data: any) {
    const lesson = data?.lesson;
    console.log(lesson);
    this.router.navigate(['/guest-lesson-video'], { queryParams: lesson });
  }

  getLessonsSections(lessonId: string) {
    console.log(lessonId);
    this.http.get(this.url + 'get-sections.php?lessonID=' + lessonId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.taps = res?.tapLearn;
        this.cultures = res?.cultureInsights;
        this.reviewsMC = res?.multipleChoice;
        this.reviewsMW = res?.matchingWords;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  ionViewDidLeave(){
    
  }

}
