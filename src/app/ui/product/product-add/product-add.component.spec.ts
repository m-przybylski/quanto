import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ProductAddComponent } from './product-add.component'
import { ProductCategoryService } from '../../../core/product/product-category.service'
import { Deceiver } from 'deceiver-core'
import { ProductService } from '../../../core/product/product.service'

describe('ProductAddComponent', () => {
  let component: ProductAddComponent
  // let fixture: ComponentFixture<ProductAddComponent>
  let productCategoryService: ProductCategoryService
  let productService: ProductService
  beforeEach(
    () => {
      productCategoryService = Deceiver(ProductCategoryService)
      productService = Deceiver(ProductService)
      component = new ProductAddComponent(
        productService,
        productCategoryService,
        undefined,
        undefined,
        undefined,
      )
    },
    // async(() => {
    //   TestBed.configureTestingModule({
    //     declarations: [ProductAddComponent],
    //   }).compileComponents()
    // }),
  )

  beforeEach(() => {
    // fixture = TestBed.createComponent(ProductAddComponent)
    // component = fixture.componentInstance
    // fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should add curency and modify table', () => {
    expect(component.currencyListArray).toEqual([
      [{ label: 'USD', value: 'USD' }, { label: 'EUR', value: 'EUR' }],
    ])
    component.addPrice(1)
    expect(component.currencyListArray).toEqual([
      [{ label: 'USD', value: 'USD' }, { label: 'EUR', value: 'EUR' }],
      [{ label: 'EUR', value: 'EUR' }],
    ])
    expect(component.disableAdd).toBeTruthy()
    expect(component.disableRemove).toBeFalsy()
  })
  it('should remove curency and modify table', () => {
    component.disableAdd = true
    component.disableRemove = false
    component.currencyListArray = [
      [{ label: 'USD', value: 'USD' }, { label: 'EUR', value: 'EUR' }],
      [{ label: 'EUR', value: 'EUR' }],
    ]
    component.removePrice(1)
    expect(component.currencyListArray).toEqual([
      [{ label: 'USD', value: 'USD' }, { label: 'EUR', value: 'EUR' }],
    ])
    expect(component.disableAdd).toBeFalsy()
    expect(component.disableRemove).toBeTruthy()
  })
})
