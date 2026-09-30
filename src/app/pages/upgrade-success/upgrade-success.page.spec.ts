import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpgradeSuccessPage } from './upgrade-success.page';

describe('UpgradeSuccessPage', () => {
  let component: UpgradeSuccessPage;
  let fixture: ComponentFixture<UpgradeSuccessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
