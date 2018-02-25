import { TestBed, inject } from '@angular/core/testing'

import { QuoteService } from './quote.service'

describe('QuoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoteService],
    })
  })

  xit(
    'should be created',
    inject([QuoteService], (service: QuoteService) => {
      expect(service).toBeTruthy()
    }),
  )
})
