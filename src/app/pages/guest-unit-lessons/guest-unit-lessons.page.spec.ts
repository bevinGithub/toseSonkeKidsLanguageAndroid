import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestUnitLessonsPage } from './guest-unit-lessons.page';

describe('GuestUnitLessonsPage', () => {
  let component: GuestUnitLessonsPage;
  let fixture: ComponentFixture<GuestUnitLessonsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestUnitLessonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
