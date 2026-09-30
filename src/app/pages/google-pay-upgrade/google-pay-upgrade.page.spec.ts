import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GooglePayUpgradePage } from './google-pay-upgrade.page';

describe('GooglePayUpgradePage', () => {
  let component: GooglePayUpgradePage;
  let fixture: ComponentFixture<GooglePayUpgradePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglePayUpgradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
