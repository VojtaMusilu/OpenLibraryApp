import { TestBed } from '@angular/core/testing';

import { GetWorkService } from './get-work.service';

describe('GetWorkService', () => {
  let service: GetWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
