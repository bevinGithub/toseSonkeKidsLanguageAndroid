import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermsLoggedPage } from './terms-logged.page';

describe('TermsLoggedPage', () => {
  let component: TermsLoggedPage;
  let fixture: ComponentFixture<TermsLoggedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsLoggedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
