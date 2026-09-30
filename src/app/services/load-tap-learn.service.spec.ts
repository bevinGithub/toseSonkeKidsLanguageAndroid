import { TestBed } from '@angular/core/testing';

import { LoadTapLearnService } from './load-tap-learn.service';

describe('LoadTapLearnService', () => {
  let service: LoadTapLearnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadTapLearnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
