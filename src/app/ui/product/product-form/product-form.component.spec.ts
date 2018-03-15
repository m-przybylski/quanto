import { ProductFormComponent } from './product-form.component'
import { Deceiver } from 'deceiver-core'
import { ProductService } from '../../../core/product/product.service'
import {
  ProductCategory,
  CurrencyDropDown,
} from '../../../core/product/products'
import { of } from 'rxjs/observable/of'
import { TestBed, ComponentFixture, async } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MessageService } from 'primeng/components/common/messageservice'
import { RouterTestingModule } from '@angular/router/testing'
import { PrimeTestingModule } from '../../../shared/test/prime-mock.module'
import { HeaderModule } from '../../../shared/header/header.module'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'qto-product-form',
  template: '',
})
export class ProductFormMockComponent {
  @Input() product
  @Input() productCategories
}

describe('ProductFormComponent', () => {
  let component: ProductFormComponent
  let fixture: ComponentFixture<ProductFormComponent>
  let productService: ProductService

  const categories: ProductCategory[] = [
    { name: 'Consulting', description: 'Consulting' },
    { name: 'Hardware', description: 'Hardware' },
  ]
  beforeEach(
    async(() => {
      productService = Deceiver(ProductService, {
        getProductBySKU: jasmine.createSpy().and.returnValue(of({})),
      })
      productService.getCurrency = () =>
        of(<CurrencyDropDown[]>[
          { label: 'USD', value: 'USD' },
          { label: 'EUR', value: 'EUR' },
          { label: 'PLN', value: 'PLN' },
        ])
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          PrimeTestingModule,
          HeaderModule,
        ],
        declarations: [ProductFormComponent],
        providers: [
          {
            provide: MessageService,
            useClass: MessageService,
          },
          {
            provide: ProductService,
            useValue: productService,
          },
        ],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent)
    component = fixture.componentInstance
    component.productCategories = categories
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should add curency and modify table', () => {
    component.addPrice(0)
    expect(component.currencyListArray).toEqual(<CurrencyDropDown[][]>[
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
    expect(component.currencyListArray).toEqual(<CurrencyDropDown[][]>[
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
    expect(component.currencyListArray).toEqual(<CurrencyDropDown[][]>[
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
