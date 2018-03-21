import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuoteFormComponent } from './quote-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'
import { CalendarModule } from 'primeng/calendar'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { MessageService } from 'primeng/components/common/messageservice'
import { Product } from '../../../core/product/products'
import { Company } from '../../../core/company/company'
import { RouterTestingModule } from '@angular/router/testing'
import { Quote, Client } from '../../../core/quote/quote'
import { PrimeTestingModule } from '../../../shared/test/prime-mock.module'

const productList: Product[] = [
  {
    name: 'name',
    price: [{ currency: 'USD', price: 12 }],
    sku: '123',
    description: 'opus',
    categories: [{ name: 'Software', description: 'Software' }],
  },
  {
    name: 'name',
    price: [{ currency: 'USD', price: 12 }],
    sku: '1234',
    description: 'opus',
    categories: [{ name: 'Hardware', description: 'Hardware' }],
  },
]

const client: Client = {
  name: 'client 1',
  bill: {
    city: 'asd',
    contanctAddress: 'asd',
    contanctEmail: 'asd',
    country: 'asd',
    postalCode: 'asd',
    contanctName: 'asd',
    name: 'asd',
  },
  ship: {
    city: 'asd',
    contanctAddress: 'asd',
    contanctEmail: 'asd',
    country: 'asd',
    postalCode: 'asd',
    contanctName: 'asd',
    name: 'asd',
  },
}
const client2: Client = {
  name: 'client 2',
  bill: {
    city: 'city',
    contanctAddress: '',
    contanctEmail: '',
    country: '',
    postalCode: '',
    contanctName: '',
    name: '',
  },
  ship: {
    city: 'city',
    contanctAddress: '',
    contanctEmail: '',
    country: '',
    postalCode: '',
    contanctName: '',
    name: '',
  },
}

const quoteData: Quote = {
  id: 10,
  client: { ...client },
  company: { name: 'company 1', address: '' },
  created: new Date('11/10/2018'),
  expiration: undefined,
  currency: 'USD',
  preparedBy: 'janusz',
  products: [{ product: productList[0], quantity: 10, discount: 0 }],
}

const ProductList: Product[] = [
  {
    name: 'name',
    price: [{ currency: 'USD', price: 12 }],
    sku: '123',
    description: 'opus',
    categories: [{ name: 'Software', description: 'Software' }],
  },
]

const CompanyList: Company[] = [
  {
    name: 'name 1',
    address: 'address 1',
  },
]

describe('QuoteFormComponent', () => {
  let component: QuoteFormComponent
  let fixture: ComponentFixture<QuoteFormComponent>
  describe('QuoteFormComponent with no quote provided', () => {
    beforeEach(
      async(() => {
        TestBed.configureTestingModule({
          imports: [
            ReactiveFormsModule,
            DropdownModule,
            CalendarModule,
            AutoCompleteModule,
            RouterTestingModule.withRoutes([]),
          ],
          declarations: [QuoteFormComponent],
          providers: [MessageService],
        }).compileComponents()
      }),
    )

    beforeEach(() => {
      fixture = TestBed.createComponent(QuoteFormComponent)
      component = fixture.componentInstance
    })

    it('should initialize form group', () => {
      component.productList = ProductList
      component.companyList = CompanyList
      component.ngOnInit()
      expect(component.quoteForm).toBeTruthy()
      expect(component.quoteForm.controls)
    })
    it('should initialize form group', () => {})
  })
  describe('QuoteFormComponent with quote provided', () => {
    beforeEach(
      async(() => {
        TestBed.configureTestingModule({
          imports: [
            ReactiveFormsModule,
            PrimeTestingModule,
            RouterTestingModule.withRoutes([]),
          ],
          declarations: [QuoteFormComponent],
          providers: [MessageService],
        }).compileComponents()
      }),
    )
    beforeEach(() => {
      fixture = TestBed.createComponent(QuoteFormComponent)
      component = fixture.componentInstance
      component.quote = quoteData
      component.clientList = [client, client2]
      fixture.detectChanges()
    })
    it('should initialize form group', () => {
      component.productList = ProductList
      component.companyList = CompanyList
      component.ngOnInit()
      expect(component.quoteForm).toBeTruthy()
      expect(component.quoteForm.controls)
    })
    it('should initialize form group', () => {
      component.selectCustomer(client2)
      expect(component.clientDetailArray.value).toEqual([
        {
          nameCtrl: client2.ship.name,
          contanctNameCtrl: client2.ship.contanctName,
          contanctEmailCtrl: client2.ship.contanctEmail,
          contanctAddressCtrl: client2.ship.contanctAddress,
          cityCtrl: client2.ship.city,
          postalCodeCtrl: client2.ship.postalCode,
          countryCtrl: client2.ship.country,
        },
        {
          nameCtrl: client2.ship.name,
          contanctNameCtrl: client2.bill.contanctName,
          contanctEmailCtrl: client2.bill.contanctEmail,
          contanctAddressCtrl: client2.bill.contanctAddress,
          cityCtrl: client2.bill.city,
          postalCodeCtrl: client2.bill.postalCode,
          countryCtrl: client2.bill.country,
        },
      ])
    })
    it('should emit quote when button clicked', done => {
      expect(component.quoteForm.valid).toBeTruthy()
      component.save.subscribe(quote => {
        expect(quote).toBeTruthy()
        done()
      })
      component.saveQuote()
    })
    it('should hide shippping and billing information when clinet is not provided', () => {
      component.quoteForm.controls.clientCtrl.setValue('')
      fixture.detectChanges()
      component.customerKeyUp()
      expect(component.clientDetailArray.length).toBe(0)
    })
    it('should show shippping and billing information when clinet is not provided', () => {
      component.quoteForm.controls.clientCtrl.setValue('')
      component.customerKeyUp()
      component.quoteForm.controls.clientCtrl.setValue('asd')
      fixture.detectChanges()
      component.customerKeyUp()
      expect(component.clientDetailArray.length).toBe(2)
    })
    it('should filter cutomer list by query', () => {
      expect(component.filteredCustomer).toBeUndefined()
      component.filterCustomer({ query: '2' })
      expect(component.filteredCustomer).toEqual([client2])
    })
  })
})
