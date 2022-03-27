import { TestBed } from '@angular/core/testing';

import { RtdbService } from './rtdb.service';

describe('RtdbService', () => {
  let service: RtdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
