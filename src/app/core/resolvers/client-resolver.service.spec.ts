import { TestBed, inject } from '@angular/core/testing';

import { ClientResolverService } from './client-resolver.service';

describe('ClientResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientResolverService]
    });
  });

  it('should be created', inject([ClientResolverService], (service: ClientResolverService) => {
    expect(service).toBeTruthy();
  }));
});
