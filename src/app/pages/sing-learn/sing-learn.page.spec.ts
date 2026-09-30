import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingLearnPage } from './sing-learn.page';

describe('SingLearnPage', () => {
  let component: SingLearnPage;
  let fixture: ComponentFixture<SingLearnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SingLearnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
