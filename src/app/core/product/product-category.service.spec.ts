import { TestBed, inject } from '@angular/core/testing'

import { ProductCategoryService } from './product-category.service'

describe('ProductCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductCategoryService],
    })
  })

  it(
    'should be created',
    inject([ProductCategoryService], (service: ProductCategoryService) => {
      expect(service).toBeTruthy()
    }),
  )
})
