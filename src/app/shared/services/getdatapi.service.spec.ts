import { TestBed } from '@angular/core/testing';

import { GetdatapiService } from './getdatapi.service';

describe('GetdatapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetdatapiService = TestBed.get(GetdatapiService);
    expect(service).toBeTruthy();
  });
});
