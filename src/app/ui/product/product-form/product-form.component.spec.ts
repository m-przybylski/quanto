import { ProductFormComponent } from './product-form.component'
import { Deceiver } from 'deceiver-core'
import { ProductService } from '../../../core/product/product.service'
import {
  ProductCategory,
  CurrencyDropDown,
  Product,
} from '../../../core/product/products'
import { of } from 'rxjs'
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

const product: Product = {
  sku: '123',
  name: 'someName',
  description: 'someDescription',
  price: [{ price: 10, currency: 'PLN' }],
  categories: [{ name: 'Consulting', description: 'Consulting' }],
}

describe('ProductFormComponent', () => {
  let component: ProductFormComponent
  let fixture: ComponentFixture<ProductFormComponent>
  let productService: ProductService
  let messageService: MessageService

  const categories: ProductCategory[] = [
    { name: 'Consulting', description: 'Consulting' },
    { name: 'Hardware', description: 'Hardware' },
  ]
  describe('ProductFormComponent with product input', () => {
    beforeEach(async(() => {
      productService = Deceiver(ProductService, {
        getProductBySKU: jasmine.createSpy().and.returnValue(of({})),
        addEditProduct: jasmine.createSpy().and.returnValue(Promise.resolve()),
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
    }))
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
    it('should validate that sku exists', done => {
      component.productGroup.controls.productSku.setValue('bla')
      fixture.detectChanges()
      setTimeout(() => {
        expect(component.productGroup.controls.productSku.valid).toBeTruthy()
        done()
      }, 0)
    })
    it('should validate that sku exists', done => {
      ;(<jasmine.Spy>productService.getProductBySKU).and.returnValue(of([{}])),
        component.productGroup.controls.productSku.setValue('bla')
      fixture.detectChanges()
      setTimeout(() => {
        expect(component.productGroup.controls.productSku.valid).toBeFalsy()
        done()
      }, 0)
    })
  })
  describe('ProductFormComponent with product input', () => {
    beforeEach(async(() => {
      messageService = Deceiver(MessageService, {
        add: jasmine.createSpy('add').and.stub(),
      })
      productService = Deceiver(ProductService, {
        getProductBySKU: jasmine.createSpy().and.returnValue(of([])),
        addEditProduct: jasmine.createSpy().and.returnValue(Promise.resolve()),
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
            useValue: messageService,
          },
          {
            provide: ProductService,
            useValue: productService,
          },
        ],
      }).compileComponents()
    }))
    beforeEach(() => {
      fixture = TestBed.createComponent(ProductFormComponent)
      component = fixture.componentInstance
      component.productCategories = categories
      component.product = product
      fixture.detectChanges()
    })
    it('should populate form productName with value name of product', () => {
      expect(component.productGroup.controls.productName.value).toEqual(
        product.name,
      )
    })
    it('should populate form productSku with value sku of product', () => {
      expect(component.productGroup.controls.productSku.value).toEqual(
        product.sku,
      )
    })
    it('should populate form description with value description of product', () => {
      expect(component.productGroup.controls.description.value).toEqual(
        product.description,
      )
    })
    it('should populate form productCategoryCtrl with value category of product', () => {
      expect(component.productGroup.controls.productCategoryCtrl.value).toEqual(
        product.categories[0],
      )
    })
    it('should populate form proces with value prices of product', () => {
      expect(component.prices.length).toBe(product.price.length)
    })
    it('should post product to backed', () => {
      component.postProduct()
      expect(productService.addEditProduct).toHaveBeenCalledWith(product)
    })
    it('should display error message when promise is rejected', done => {
      ;(<jasmine.Spy>productService.addEditProduct).and.returnValue(
        Promise.reject('oups'),
      )
      component.postProduct()
      setTimeout(() => {
        expect(messageService.add).toHaveBeenCalledWith({
          severity: 'error',
          summary: 'Error Message',
          detail: 'oups',
        }),
          done()
      }, 0)
    })
  })
})
