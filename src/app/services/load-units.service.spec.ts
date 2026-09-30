import { TestBed } from '@angular/core/testing';

import { LoadUnitsService } from './load-units.service';

describe('LoadUnitsService', () => {
  let service: LoadUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
