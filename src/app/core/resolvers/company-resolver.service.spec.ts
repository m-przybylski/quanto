import { TestBed, inject } from '@angular/core/testing'

import { CompanyResolverService } from './company-resolver.service'

describe('CompanyResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyResolverService],
    })
  })

  it(
    'should be created',
    inject([CompanyResolverService], (service: CompanyResolverService) => {
      expect(service).toBeTruthy()
    }),
  )
})
