import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscribeRegistrationPage } from './subscribe-registration.page';

describe('SubscribeRegistrationPage', () => {
  let component: SubscribeRegistrationPage;
  let fixture: ComponentFixture<SubscribeRegistrationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
