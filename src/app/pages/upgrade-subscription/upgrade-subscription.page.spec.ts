import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpgradeSubscriptionPage } from './upgrade-subscription.page';

describe('UpgradeSubscriptionPage', () => {
  let component: UpgradeSubscriptionPage;
  let fixture: ComponentFixture<UpgradeSubscriptionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeSubscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
