import { TestBed } from '@angular/core/testing';

import { LoadWatchLearnService } from './load-watch-learn.service';

describe('LoadWatchLearnService', () => {
  let service: LoadWatchLearnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadWatchLearnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
