import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolicyLoggedPage } from './policy-logged.page';

describe('PolicyLoggedPage', () => {
  let component: PolicyLoggedPage;
  let fixture: ComponentFixture<PolicyLoggedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyLoggedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
