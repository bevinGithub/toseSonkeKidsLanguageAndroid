import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseUnitsPage } from './course-units.page';

describe('CourseUnitsPage', () => {
  let component: CourseUnitsPage;
  let fixture: ComponentFixture<CourseUnitsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseUnitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
