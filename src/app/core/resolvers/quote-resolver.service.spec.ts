import { TestBed, inject } from '@angular/core/testing'

import { QuoteResolverService } from './quote-resolver.service'

describe('QuoteResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoteResolverService],
    })
  })

  xit(
    'should be created',
    inject([QuoteResolverService], (service: QuoteResolverService) => {
      expect(service).toBeTruthy()
    }),
  )
})
