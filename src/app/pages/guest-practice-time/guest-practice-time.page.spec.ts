import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestPracticeTimePage } from './guest-practice-time.page';

describe('GuestPracticeTimePage', () => {
  let component: GuestPracticeTimePage;
  let fixture: ComponentFixture<GuestPracticeTimePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPracticeTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
