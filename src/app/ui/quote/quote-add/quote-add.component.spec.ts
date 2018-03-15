import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuoteAddComponent } from './quote-add.component'
import { ButtonModule } from 'primeng/button'
import { HeaderModule } from '../../../shared/header/header.module'
import { RouterTestingModule } from '@angular/router/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'
import { CalendarModule } from 'primeng/calendar'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { QuoteService } from '../../../core/quote/quote.service'
import { AngularFireAuth } from 'angularfire2/auth'
import {
  AngularFireAuthMock,
  AngularFirestoreMock,
} from '../../../core/common.test'
import { AngularFireDatabase } from 'angularfire2/database'
import { Product, CurrencyDropDown } from '../../../core/product/products'
import { Company } from '../../../core/company/company'
import { MessageService } from 'primeng/components/common/messageservice'
import { Component, Input } from '@angular/core'
import { Client, Quote } from '../../../core/quote/quote'
import { ActivatedRoute } from '@angular/router'
import { Deceiver } from 'deceiver-core'

@Component({ selector: 'qto-quote-form', template: '' })
class QuoteFormComponent {
  @Input() companyList: Company[] = []
  @Input() productList: Product[] = []
  @Input() clientList: Client[] = []
  @Input() currencyList: CurrencyDropDown[] = []
  @Input() nextID: number
  @Input() quote: Quote
  // @Output() save: EventEmitter<Quote> = new EventEmitter<Quote>()
}
describe('QuoteAddComponent', () => {
  let component: QuoteAddComponent
  let fixture: ComponentFixture<QuoteAddComponent>
  let addMessage: jasmine.Spy
  const resolve = {
    snapshot: { data: { products: [], company: [] } },
  }
  describe('QuoteAddComponent with no resolvers', () => {
    beforeEach(
      async(() => {
        addMessage = jasmine.createSpy('addMessage').and.callThrough()
        const messageServiceMock = Deceiver(MessageService, { add: addMessage })
        TestBed.configureTestingModule({
          imports: [
            ButtonModule,
            HeaderModule,
            RouterTestingModule.withRoutes([
              { path: 'quote', component: QuoteFormComponent },
            ]),
            ReactiveFormsModule,
            DropdownModule,
            CalendarModule,
            AutoCompleteModule,
          ],
          declarations: [QuoteAddComponent, QuoteFormComponent],
          providers: [
            { provide: MessageService, useValue: messageServiceMock },
            QuoteService,
            {
              provide: AngularFireAuth,
              useFactory: AngularFireAuthMock,
            },
            {
              provide: AngularFireDatabase,
              useFactory: AngularFirestoreMock,
            },
            { provide: ActivatedRoute, useValue: resolve },
          ],
        }).compileComponents()
      }),
    )

    beforeEach(() => {
      fixture = TestBed.createComponent(QuoteAddComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('should display message when no input provided', () => {
      expect(addMessage).toHaveBeenCalledTimes(2)
      expect(component).toBeTruthy()
    })
  })
  describe('QuoteAddComponent with resolvers', () => {
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
    beforeEach(
      async(() => {
        resolve.snapshot.data = {
          products: ProductList,
          company: CompanyList,
        }
        addMessage = jasmine.createSpy('addMessage').and.callThrough()
        const messageServiceMock = Deceiver(MessageService, { add: addMessage })
        TestBed.configureTestingModule({
          imports: [
            ButtonModule,
            HeaderModule,
            RouterTestingModule.withRoutes([
              { path: 'quote', component: QuoteFormComponent },
            ]),
            ReactiveFormsModule,
            DropdownModule,
            CalendarModule,
            AutoCompleteModule,
          ],
          declarations: [QuoteAddComponent, QuoteFormComponent],
          providers: [
            { provide: MessageService, useValue: messageServiceMock },
            QuoteService,
            {
              provide: AngularFireAuth,
              useFactory: AngularFireAuthMock,
            },
            {
              provide: AngularFireDatabase,
              useFactory: AngularFirestoreMock,
            },
            { provide: ActivatedRoute, useValue: resolve },
          ],
        }).compileComponents()
      }),
    )

    beforeEach(() => {
      fixture = TestBed.createComponent(QuoteAddComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should create', () => {
      expect(component).toBeTruthy()
      expect(addMessage.calls.any()).toBe(false)
    })
  })
})
