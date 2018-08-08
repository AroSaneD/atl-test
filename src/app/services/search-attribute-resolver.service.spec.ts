import { TestBed, inject } from '@angular/core/testing';

import { SearchAttributeResolver } from './search-attribute-resolver.service';

describe('SearchAttributeResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchAttributeResolver]
    });
  });

  it('should be created', inject([SearchAttributeResolver], (service: SearchAttributeResolver) => {
    expect(service).toBeTruthy();
  }));
});
