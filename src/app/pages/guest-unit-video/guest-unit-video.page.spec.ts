import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestUnitVideoPage } from './guest-unit-video.page';

describe('GuestUnitVideoPage', () => {
  let component: GuestUnitVideoPage;
  let fixture: ComponentFixture<GuestUnitVideoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestUnitVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
