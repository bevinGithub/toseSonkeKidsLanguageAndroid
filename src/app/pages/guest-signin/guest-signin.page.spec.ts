import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestSigninPage } from './guest-signin.page';

describe('GuestSigninPage', () => {
  let component: GuestSigninPage;
  let fixture: ComponentFixture<GuestSigninPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestSigninPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
