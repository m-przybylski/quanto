import { TestBed, inject } from '@angular/core/testing'

import { ClientResolverService } from './client-resolver.service'
import { QuoteService } from '../quote/quote.service'

describe('ClientResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientResolverService, QuoteService],
    })
  })

  xit(
    'should be created',
    inject([ClientResolverService], (service: ClientResolverService) => {
      expect(service).toBeTruthy()
    }),
  )
})
