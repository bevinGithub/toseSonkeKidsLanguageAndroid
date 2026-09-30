import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FreeUnitLessonsPage } from './free-unit-lessons.page';

describe('FreeUnitLessonsPage', () => {
  let component: FreeUnitLessonsPage;
  let fixture: ComponentFixture<FreeUnitLessonsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeUnitLessonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
