import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelSubscriptionPage } from './cancel-subscription.page';

describe('CancelSubscriptionPage', () => {
  let component: CancelSubscriptionPage;
  let fixture: ComponentFixture<CancelSubscriptionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelSubscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
