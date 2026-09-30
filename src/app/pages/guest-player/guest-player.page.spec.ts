import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestPlayerPage } from './guest-player.page';

describe('GuestPlayerPage', () => {
  let component: GuestPlayerPage;
  let fixture: ComponentFixture<GuestPlayerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
