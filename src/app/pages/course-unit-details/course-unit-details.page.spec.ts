import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseUnitDetailsPage } from './course-unit-details.page';

describe('CourseUnitDetailsPage', () => {
  let component: CourseUnitDetailsPage;
  let fixture: ComponentFixture<CourseUnitDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseUnitDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
