import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestLessonVideoPage } from './guest-lesson-video.page';

describe('GuestLessonVideoPage', () => {
  let component: GuestLessonVideoPage;
  let fixture: ComponentFixture<GuestLessonVideoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestLessonVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
