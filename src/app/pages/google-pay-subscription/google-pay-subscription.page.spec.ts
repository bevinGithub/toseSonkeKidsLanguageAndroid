import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GooglePaySubscriptionPage } from './google-pay-subscription.page';

describe('GooglePaySubscriptionPage', () => {
  let component: GooglePaySubscriptionPage;
  let fixture: ComponentFixture<GooglePaySubscriptionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglePaySubscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
