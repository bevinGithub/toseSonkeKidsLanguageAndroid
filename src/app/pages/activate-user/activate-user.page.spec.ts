import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivateUserPage } from './activate-user.page';

describe('ActivateUserPage', () => {
  let component: ActivateUserPage;
  let fixture: ComponentFixture<ActivateUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
