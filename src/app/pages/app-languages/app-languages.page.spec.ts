import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppLanguagesPage } from './app-languages.page';

describe('AppLanguagesPage', () => {
  let component: AppLanguagesPage;
  let fixture: ComponentFixture<AppLanguagesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLanguagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
