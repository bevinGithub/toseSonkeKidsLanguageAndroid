import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpgradeOptionsPage } from './upgrade-options.page';

describe('UpgradeOptionsPage', () => {
  let component: UpgradeOptionsPage;
  let fixture: ComponentFixture<UpgradeOptionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
