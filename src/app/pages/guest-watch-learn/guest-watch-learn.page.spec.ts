import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestWatchLearnPage } from './guest-watch-learn.page';

describe('GuestWatchLearnPage', () => {
  let component: GuestWatchLearnPage;
  let fixture: ComponentFixture<GuestWatchLearnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestWatchLearnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
