import { TestBed } from '@angular/core/testing';

import { ShareForCareService } from './share-for-care.service';

describe('ShareForCareService', () => {
  let service: ShareForCareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareForCareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
