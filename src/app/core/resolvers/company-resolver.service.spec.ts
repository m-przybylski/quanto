import { TestBed, inject } from '@angular/core/testing'

import { CompanyResolverService } from './company-resolver.service'
import { CompanyService } from '../company/company.service'

describe('CompanyResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyResolverService, CompanyService],
    })
  })

  xit(
    'should be created',
    inject([CompanyResolverService], (service: CompanyResolverService) => {
      expect(service).toBeTruthy()
    }),
  )
})
