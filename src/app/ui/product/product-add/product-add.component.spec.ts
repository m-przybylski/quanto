import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MessageService } from 'primeng/components/common/messageservice'
import { Router, ActivatedRoute } from '@angular/router'
import { Component, Input } from '@angular/core'
import { ProductAddComponent } from './product-add.component'

@Component({
  selector: 'qto-product-form',
  template: '',
})
export class ProductFormMockComponent {
  @Input() product
  @Input() productCategories
}

describe('ProductAddComponent', () => {
  let component: ProductAddComponent
  let fixture: ComponentFixture<ProductAddComponent>
  let messageService, routerSpy
  beforeEach(
    async(() => {
      messageService = jasmine.createSpyObj('MessageService', ['add'])
      routerSpy = jasmine.createSpyObj('Router', ['navigate'])
      TestBed.configureTestingModule({
        declarations: [ProductAddComponent, ProductFormMockComponent],
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
    fixture = TestBed.createComponent(ProductAddComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
