import { TestBed } from '@angular/core/testing';

import { LoadSingLearnService } from './load-sing-learn.service';

describe('LoadSingLearnService', () => {
  let service: LoadSingLearnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadSingLearnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
