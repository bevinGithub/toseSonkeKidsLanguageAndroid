import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestRhymesPlaylistPage } from './guest-rhymes-playlist.page';

describe('GuestRhymesPlaylistPage', () => {
  let component: GuestRhymesPlaylistPage;
  let fixture: ComponentFixture<GuestRhymesPlaylistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRhymesPlaylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
