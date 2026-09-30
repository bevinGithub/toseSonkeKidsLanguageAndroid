import { TestBed } from '@angular/core/testing';

import { LoadRhymesPlaylistService } from './load-rhymes-playlist.service';

describe('LoadRhymesPlaylistService', () => {
  let service: LoadRhymesPlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadRhymesPlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
