import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitProgressPage } from './unit-progress.page';

describe('UnitProgressPage', () => {
  let component: UnitProgressPage;
  let fixture: ComponentFixture<UnitProgressPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitProgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
