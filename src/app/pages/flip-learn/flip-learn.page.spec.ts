import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlipLearnPage } from './flip-learn.page';

describe('FlipLearnPage', () => {
  let component: FlipLearnPage;
  let fixture: ComponentFixture<FlipLearnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipLearnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
