import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ProductEditComponent } from './product-edit.component'
import { MessageService } from 'primeng/components/common/messageservice'
import { Router, ActivatedRoute } from '@angular/router'
import { PrimeTestingModule } from '../../../shared/test/prime-mock.module'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'qto-product-form',
  template: '',
})
export class ProductFormMockComponent {
  @Input() product
  @Input() productCategories
}

describe('ProductEditComponent', () => {
  let component: ProductEditComponent
  let fixture: ComponentFixture<ProductEditComponent>
  let messageService, routerSpy
  describe('ProductEditComponent with no data', () => {
    beforeEach(
      async(() => {
        messageService = jasmine.createSpyObj('MessageService', ['add'])
        routerSpy = jasmine.createSpyObj('Router', ['navigate'])
        TestBed.configureTestingModule({
          declarations: [ProductEditComponent, ProductFormMockComponent],
          providers: [
            {
              provide: MessageService,
              useValue: messageService,
            },
            { provide: Router, useValue: routerSpy },
            {
              provide: ActivatedRoute,
              useValue: { snapshot: { data: {} } },
            },
          ],
        }).compileComponents()
      }),
    )

    beforeEach(() => {
      fixture = TestBed.createComponent(ProductEditComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('should send message and redirect', () => {
      // component.ngOnInit()
      expect(component.product).toBeFalsy()
      expect((<jasmine.Spy>routerSpy.navigate).calls.count()).toBe(
        1,
        'should be called once',
      )
      expect((<jasmine.Spy>messageService.add).calls.count()).toBe(
        1,
        'should be called once',
      )
    })
  })
  describe('ProductEditComponent with data', () => {
    beforeEach(
      async(() => {
        messageService = jasmine.createSpyObj('MessageService', ['add'])
        routerSpy = jasmine.createSpyObj('Router', ['navigate'])
        TestBed.configureTestingModule({
          imports: [PrimeTestingModule],
          declarations: [ProductEditComponent, ProductFormMockComponent],
          providers: [
            {
              provide: MessageService,
              useValue: messageService,
            },
            { provide: Router, useValue: routerSpy },
            {
              provide: ActivatedRoute,
              useValue: {
                snapshot: {
                  data: {
                    product: [
                      {
                        sku: '123',
                        name: '123',
                        price: [],
                        description: 'asd',
                        categories: [],
                      },
                    ],
                  },
                  params: { sku: '123' },
                },
              },
            },
          ],
        }).compileComponents()
      }),
    )

    beforeEach(() => {
      fixture = TestBed.createComponent(ProductEditComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('should not send message and redirect when product is provided', () => {
      expect((<jasmine.Spy>routerSpy.navigate).calls.count()).toBe(
        0,
        'should not be called once',
      )
      expect((<jasmine.Spy>messageService.add).calls.count()).toBe(
        0,
        'should not be called once',
      )
    })
  })
})
