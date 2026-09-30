import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestMenuPage } from './guest-menu.page';

describe('GuestMenuPage', () => {
  let component: GuestMenuPage;
  let fixture: ComponentFixture<GuestMenuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
