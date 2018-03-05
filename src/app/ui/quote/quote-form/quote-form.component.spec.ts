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

  it('should create', () => {
    component.productList = ProductList
    component.companyList = CompanyList
    const addMessage = spyOn(
      fixture.debugElement.injector.get(MessageService),
      'add',
    ).and.callThrough()
    expect(component).toBeTruthy()
    expect(addMessage.calls.any()).toBe(false)
  })

  it('should display message when no input provided', () => {
    const addMessage = spyOn(
      fixture.debugElement.injector.get(MessageService),
      'add',
    ).and.callThrough()
    component.ngOnInit()
    expect(addMessage).toHaveBeenCalledTimes(2)
    expect(component).toBeTruthy()
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
