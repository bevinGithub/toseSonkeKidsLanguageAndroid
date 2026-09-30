import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitVideoPage } from './unit-video.page';

describe('UnitVideoPage', () => {
  let component: UnitVideoPage;
  let fixture: ComponentFixture<UnitVideoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
