import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RhymesPlaylistPage } from './rhymes-playlist.page';

describe('RhymesPlaylistPage', () => {
  let component: RhymesPlaylistPage;
  let fixture: ComponentFixture<RhymesPlaylistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RhymesPlaylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
