import { TestBed } from '@angular/core/testing';

import { LoadFlipLearnService } from './load-flip-learn.service';

describe('LoadFlipLearnService', () => {
  let service: LoadFlipLearnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadFlipLearnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
