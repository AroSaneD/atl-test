import { TestBed, inject } from '@angular/core/testing';

import { UrlRecognitionService } from './url-recognition.service';

describe('UrlRecognitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlRecognitionService]
    });
  });

  it('should be created', inject([UrlRecognitionService], (service: UrlRecognitionService) => {
    expect(service).toBeTruthy();
  }));
});
