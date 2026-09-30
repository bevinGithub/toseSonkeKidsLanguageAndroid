import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestUnitDetailsPage } from './guest-unit-details.page';

describe('GuestUnitDetailsPage', () => {
  let component: GuestUnitDetailsPage;
  let fixture: ComponentFixture<GuestUnitDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestUnitDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
