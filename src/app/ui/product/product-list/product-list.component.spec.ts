import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ProductListComponent } from './product-list.component'
import { ButtonModule } from 'primeng/button'
import { HeaderModule } from '../../../shared/header/header.module'
import { DataListModule } from 'primeng/datalist'
import { RouterTestingModule } from '@angular/router/testing'

describe('ProductListComponent', () => {
  let component: ProductListComponent
  let fixture: ComponentFixture<ProductListComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          HeaderModule,
          DataListModule,
          ButtonModule,
          RouterTestingModule,
        ],
        declarations: [ProductListComponent],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should return empty price when input is empty', () => {
    const priceStr = component.getPrice(null, 'USD')
    expect(priceStr).toBe('-')
  })

  it('should return empty price when there is no price for given currency', () => {
    const priceStr = component.getPrice(
      [{ currency: 'PLN', price: 10 }, { currency: 'EUR', price: 10 }],
      'USD',
    )
    expect(priceStr).toBe('-')
  })

  it('should return empty price for given currency as a string', () => {
    const priceStr = component.getPrice(
      [
        { currency: 'PLN', price: 10 },
        { currency: 'EUR', price: 15 },
        { currency: 'USD', price: 20 },
      ],
      'USD',
    )
    expect(priceStr).toBe('20')
  })
})
