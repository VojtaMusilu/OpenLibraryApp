import { TestBed } from '@angular/core/testing';

import { SearchBooksService } from './search-books.service';

describe('SearchBooksService', () => {
  let service: SearchBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
