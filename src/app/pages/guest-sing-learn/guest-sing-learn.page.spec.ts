import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestSingLearnPage } from './guest-sing-learn.page';

describe('GuestSingLearnPage', () => {
  let component: GuestSingLearnPage;
  let fixture: ComponentFixture<GuestSingLearnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestSingLearnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
