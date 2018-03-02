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
})
