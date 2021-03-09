import { TestBed } from '@angular/core/testing';

import { BaseWithDependanceService } from './base-with-dependance.service';

describe('BaseWithDependanceService', () => {
  let service: BaseWithDependanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseWithDependanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
