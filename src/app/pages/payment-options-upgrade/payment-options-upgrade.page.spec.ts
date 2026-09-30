import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentOptionsUpgradePage } from './payment-options-upgrade.page';

describe('PaymentOptionsUpgradePage', () => {
  let component: PaymentOptionsUpgradePage;
  let fixture: ComponentFixture<PaymentOptionsUpgradePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOptionsUpgradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
