import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestFlipLearnPage } from './guest-flip-learn.page';

describe('GuestFlipLearnPage', () => {
  let component: GuestFlipLearnPage;
  let fixture: ComponentFixture<GuestFlipLearnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestFlipLearnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
