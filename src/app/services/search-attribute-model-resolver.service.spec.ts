import { TestBed, inject } from '@angular/core/testing';

import { SearchAttributeModelResolver } from './search-attribute-model-resolver.service';

describe('SearchAttributeModelResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchAttributeModelResolver]
    });
  });

  it('should be created', inject([SearchAttributeModelResolver], (service: SearchAttributeModelResolver) => {
    expect(service).toBeTruthy();
  }));
});
