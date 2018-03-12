import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuoteListComponent } from './quote-list.component'
import { ButtonModule } from 'primeng/button'
import { HeaderModule } from '../../../shared/header/header.module'
import { DataListModule } from 'primeng/datalist'
import { RouterTestingModule } from '@angular/router/testing'
import { Deceiver } from 'deceiver-core'
import { Quote } from '../../../core/quote/quote'
import { Product } from '../../../core/product/products'
import { DialogService } from '../../../shared/dialog/dialog.service'

describe('QuoteListComponent', () => {
  const quotes: Quote[] = [
    {
      id: 1,
      company: undefined,
      created: undefined,
      client: undefined,
      expiration: undefined,
      preparedBy: undefined,
      currency: undefined,
      products: [],
    },
    {
      id: 2,
      company: undefined,
      created: undefined,
      client: undefined,
      expiration: undefined,
      preparedBy: undefined,
      currency: undefined,
      products: [],
    },
  ]
  let component: QuoteListComponent
  let fixture: ComponentFixture<QuoteListComponent>
  const dialogServiceMock = Deceiver(DialogService)
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ButtonModule,
          HeaderModule,
          DataListModule,
          RouterTestingModule,
        ],
        declarations: [QuoteListComponent],
        providers: [{ provide: DialogService, useValue: dialogServiceMock }],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    component.quotes = quotes
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should get price for specific currency', () => {
    const product: Product = {
      categories: undefined,
      name: '',
      sku: '',
      price: [{ currency: 'PLN', price: 123 }, { currency: 'USD', price: 234 }],
      description: '',
    }
    const producQuote: { product: Product; quantity: number }[] = [
      {
        product: {
          categories: undefined,
          name: '',
          sku: '',
          price: [
            { currency: 'PLN', price: 123 },
            { currency: 'USD', price: 234 },
          ],
          description: '',
        },
        quantity: 10,
      },
      {
        product: {
          categories: undefined,
          name: '',
          sku: '',
          price: [
            { currency: 'PLN', price: 123 },
            { currency: 'USD', price: 234 },
          ],
          description: '',
        },
        quantity: 10,
      },
    ]
    expect(component.getPrice(product, 'PLN')).toEqual('123 PLN')
    expect(component.getPrice(product, 'USD')).toEqual('USD 234')
    expect(component.getPrice(product, 'EUR')).toEqual('123 PLN')
    expect(component.getPrice(product, 'EUR', 2)).toEqual('246 PLN')
    expect(component.getPrice(product, 'USD', 5)).toEqual('USD 1170')
    expect(component.getTotalSum(producQuote, 'USD')).toEqual('USD 4680')
    expect(component.getTotalSum(producQuote, 'EUR')).toEqual('')
  })
})
