import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchLearnPage } from './watch-learn.page';

describe('WatchLearnPage', () => {
  let component: WatchLearnPage;
  let fixture: ComponentFixture<WatchLearnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchLearnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
