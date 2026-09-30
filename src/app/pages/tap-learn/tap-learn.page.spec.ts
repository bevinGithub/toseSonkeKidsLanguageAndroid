import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TapLearnPage } from './tap-learn.page';

describe('TapLearnPage', () => {
  let component: TapLearnPage;
  let fixture: ComponentFixture<TapLearnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TapLearnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
