import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestTapLearnPage } from './guest-tap-learn.page';

describe('GuestTapLearnPage', () => {
  let component: GuestTapLearnPage;
  let fixture: ComponentFixture<GuestTapLearnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestTapLearnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
