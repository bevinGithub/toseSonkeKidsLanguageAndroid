import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestLanguagesPage } from './guest-languages.page';

describe('GuestLanguagesPage', () => {
  let component: GuestLanguagesPage;
  let fixture: ComponentFixture<GuestLanguagesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestLanguagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
