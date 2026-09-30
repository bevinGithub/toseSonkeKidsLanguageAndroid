import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FreeUnitDetailsPage } from './free-unit-details.page';

describe('FreeUnitDetailsPage', () => {
  let component: FreeUnitDetailsPage;
  let fixture: ComponentFixture<FreeUnitDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeUnitDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
