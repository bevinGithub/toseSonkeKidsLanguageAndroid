import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionDetailsPage } from './subscription-details.page';

describe('SubscriptionDetailsPage', () => {
  let component: SubscriptionDetailsPage;
  let fixture: ComponentFixture<SubscriptionDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
