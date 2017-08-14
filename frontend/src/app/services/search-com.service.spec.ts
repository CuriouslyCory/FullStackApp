import { TestBed, inject } from '@angular/core/testing';

import { SearchComService } from './search-com.service';

describe('SearchComService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchComService]
    });
  });

  it('should be created', inject([SearchComService], (service: SearchComService) => {
    expect(service).toBeTruthy();
  }));
});
