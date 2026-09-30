import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestCourseUnitsPage } from './guest-course-units.page';

describe('GuestCourseUnitsPage', () => {
  let component: GuestCourseUnitsPage;
  let fixture: ComponentFixture<GuestCourseUnitsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestCourseUnitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
