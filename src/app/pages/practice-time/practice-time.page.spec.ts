import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PracticeTimePage } from './practice-time.page';

describe('PracticeTimePage', () => {
  let component: PracticeTimePage;
  let fixture: ComponentFixture<PracticeTimePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
