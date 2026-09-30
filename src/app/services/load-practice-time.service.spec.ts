import { TestBed } from '@angular/core/testing';

import { LoadPracticeTimeService } from './load-practice-time.service';

describe('LoadPracticeTimeService', () => {
  let service: LoadPracticeTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadPracticeTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
