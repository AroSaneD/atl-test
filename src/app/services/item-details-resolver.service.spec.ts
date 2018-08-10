import { TestBed, inject } from '@angular/core/testing';

import { ItemDetailsResolverService } from './item-details-resolver.service';

describe('ItemDetailsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemDetailsResolverService]
    });
  });

  it('should be created', inject([ItemDetailsResolverService], (service: ItemDetailsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
