import { TestBed, inject } from '@angular/core/testing'

import { ProductResolverService } from './product-resolver.service'

describe('ProductResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductResolverService],
    })
  })

  xit(
    'should be created',
    inject([ProductResolverService], (service: ProductResolverService) => {
      expect(service).toBeTruthy()
    }),
  )
})
