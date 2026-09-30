import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FreeLessonsPage } from './free-lessons.page';

describe('FreeLessonsPage', () => {
  let component: FreeLessonsPage;
  let fixture: ComponentFixture<FreeLessonsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeLessonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
