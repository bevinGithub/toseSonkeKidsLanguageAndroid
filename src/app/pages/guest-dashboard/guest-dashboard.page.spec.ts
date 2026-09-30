import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestDashboardPage } from './guest-dashboard.page';

describe('GuestDashboardPage', () => {
  let component: GuestDashboardPage;
  let fixture: ComponentFixture<GuestDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
