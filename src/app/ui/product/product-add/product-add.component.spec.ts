import { ProductAddComponent } from './product-add.component'
import { Deceiver } from 'deceiver-core'
import { ProductService } from '../../../core/product/product.service'
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router'
import { ProductCategory } from '../../../core/product/products'

describe('ProductAddComponent', () => {
  let component: ProductAddComponent
  let productService: ProductService
  const Categories: ProductCategory[] = [
    { name: 'Consulting', description: 'Consulting' },
    { name: 'Hardware', description: 'Hardware' },
  ]
  const activateRoute = Deceiver(ActivatedRoute)
  activateRoute.snapshot = Deceiver(ActivatedRouteSnapshot)
  activateRoute.snapshot.data = { productCategories: Categories }
  beforeEach(() => {
    productService = Deceiver(ProductService)
    productService.getCurrency = () => [
      { label: 'USD', value: 'USD' },
      { label: 'EUR', value: 'EUR' },
      { label: 'PLN', value: 'PLN' },
    ]

    component = new ProductAddComponent(
      productService,
      undefined,
      undefined,
      undefined,
      activateRoute,
    )
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should add curency and modify table', () => {
    component.addPrice(0)
    expect(component.currencyListArray).toEqual([
      [
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'PLN', value: 'PLN' },
      ],
      [{ label: 'EUR', value: 'EUR' }, { label: 'PLN', value: 'PLN' }],
    ])
    expect(component.disableAdd).toBeFalsy()
    expect(component.disableRemove).toBeFalsy()
    component.addPrice(1)
    expect(component.currencyListArray).toEqual([
      [
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'PLN', value: 'PLN' },
      ],
      [{ label: 'EUR', value: 'EUR' }, { label: 'PLN', value: 'PLN' }],
      [{ label: 'PLN', value: 'PLN' }],
    ])
    expect(component.disableAdd).toBeTruthy()
    expect(component.disableRemove).toBeFalsy()
  })
  it('should remove curency and modify table', () => {
    component.addPrice(0)
    component.removePrice(1)
    expect(component.currencyListArray).toEqual([
      [
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'PLN', value: 'PLN' },
      ],
    ])
    expect(component.disableAdd).toBeFalsy()
    expect(component.disableRemove).toBeTruthy()
  })
})
