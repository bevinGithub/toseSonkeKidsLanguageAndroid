import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentCancelledPage } from './payment-cancelled.page';

describe('PaymentCancelledPage', () => {
  let component: PaymentCancelledPage;
  let fixture: ComponentFixture<PaymentCancelledPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCancelledPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
