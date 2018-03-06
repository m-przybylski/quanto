import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing'

import { QuoteEditComponent } from './quote-edit.component'
import { MessageService } from 'primeng/components/common/messageservice'
import { HeaderModule } from '../../../shared/header/header.module'
import { RouterTestingModule } from '@angular/router/testing'
import { ActivatedRoute, Router } from '@angular/router'

import { Component, Input, Output, EventEmitter } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { QuoteService } from '../../../core/quote/quote.service'

@Component({ selector: 'qto-quote-form', template: '' })
class QuoteListTestComponent {
  @Input() companyList = []
  @Input() productList = []
  @Input() clientList = []
  @Input() nextID
  @Input() quote
  @Output() save = new EventEmitter()
}

describe('QuoteEditComponent', () => {
  let component: QuoteEditComponent
  let fixture: ComponentFixture<QuoteEditComponent>
  let routerSpy: jasmine.SpyObj<Router>
  let quoteService
  describe('QuoteEditComponent with invalid data', () => {
    const routeSpy = {
      snapshot: {
        data: {
          company: [],
          products: [],
          clients: [],
          quote: null,
          nextID: 1,
        },
      },
    }
    beforeEach(
      async(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigate'])
        quoteService = jasmine.createSpyObj('QuoteService', ['addQuote'])
        TestBed.configureTestingModule({
          imports: [HeaderModule, ButtonModule, RouterTestingModule],
          declarations: [QuoteEditComponent, QuoteListTestComponent],
          providers: [
            MessageService,
            {
              provide: QuoteService,
              useValue: quoteService,
            },
            { provide: ActivatedRoute, useValue: routeSpy },
            { provide: Router, useValue: routerSpy },
          ],
        }).compileComponents()
      }),
    )

    beforeEach(() => {
      fixture = TestBed.createComponent(QuoteEditComponent)
      component = fixture.componentInstance
    })

    it('should create', () => {
      fixture.detectChanges()
      expect(component).toBeTruthy()
    })

    it('should navigate back to quote if quote does not exist', () => {
      expect(routerSpy.navigate as jasmine.Spy).toHaveBeenCalledWith(['/quote'])
    })
  })
  describe('QuoteEditComponent with valid data', () => {
    const routeSpy = {
      snapshot: {
        data: {
          company: [],
          products: [],
          clients: [],
          quote: ['someValue'],
          nextID: 1,
        },
      },
    }
    beforeEach(
      async(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigate'])
        quoteService = jasmine.createSpyObj('QuoteService', ['addQuote'])
        TestBed.configureTestingModule({
          imports: [HeaderModule, ButtonModule, RouterTestingModule],
          declarations: [QuoteEditComponent, QuoteListTestComponent],
          providers: [
            MessageService,
            {
              provide: QuoteService,
              useValue: quoteService,
            },
            { provide: ActivatedRoute, useValue: routeSpy },
            { provide: Router, useValue: routerSpy },
          ],
        }).compileComponents()
      }),
    )

    beforeEach(() => {
      fixture = TestBed.createComponent(QuoteEditComponent)
      component = fixture.componentInstance
    })

    it('should not navigate back to quote if quote exists', () => {
      expect(component.quote).toEqual('someValue')
      expect(routerSpy.navigate as jasmine.Spy).toHaveBeenCalledTimes(0)
    })
    it(
      'should call service when save is triggered',
      fakeAsync(() => {
        const testAnyElement: any = {}
        ;(<jasmine.Spy>quoteService.addQuote).and.returnValue(Promise.resolve())
        component.saveQuote(testAnyElement)
        tick()
        expect((quoteService.addQuote as jasmine.Spy).calls.argsFor(0)).toEqual(
          [testAnyElement],
          'should be called with specific parameter',
        )
        expect((quoteService.addQuote as jasmine.Spy).calls.count()).toBe(
          1,
          'should be called once',
        )
        expect((<jasmine.Spy>routerSpy.navigate).calls.count()).toBe(
          1,
          'should be called once',
        )
      }),
    )
  })
})
