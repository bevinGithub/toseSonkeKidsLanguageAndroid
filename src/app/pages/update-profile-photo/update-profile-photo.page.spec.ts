import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateProfilePhotoPage } from './update-profile-photo.page';

describe('UpdateProfilePhotoPage', () => {
  let component: UpdateProfilePhotoPage;
  let fixture: ComponentFixture<UpdateProfilePhotoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfilePhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
