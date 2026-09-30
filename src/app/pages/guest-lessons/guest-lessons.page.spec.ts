import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestLessonsPage } from './guest-lessons.page';

describe('GuestLessonsPage', () => {
  let component: GuestLessonsPage;
  let fixture: ComponentFixture<GuestLessonsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestLessonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
