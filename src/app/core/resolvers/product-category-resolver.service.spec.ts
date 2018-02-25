import { TestBed, inject } from '@angular/core/testing'

import { ProductCategoryResolverService } from './product-category-resolver.service'

describe('ProductCategoryResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductCategoryResolverService],
    })
  })

  xit(
    'should be created',
    inject(
      [ProductCategoryResolverService],
      (service: ProductCategoryResolverService) => {
        expect(service).toBeTruthy()
      },
    ),
  )
})
