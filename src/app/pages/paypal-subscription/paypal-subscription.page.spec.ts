import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaypalSubscriptionPage } from './paypal-subscription.page';

describe('PaypalSubscriptionPage', () => {
  let component: PaypalSubscriptionPage;
  let fixture: ComponentFixture<PaypalSubscriptionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalSubscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
