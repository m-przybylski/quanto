import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuoteListComponent } from './quote-list.component'
import { ButtonModule } from 'primeng/button'
import { HeaderModule } from '../../../shared/header/header.module'
import { DataListModule } from 'primeng/datalist'
import { RouterTestingModule } from '@angular/router/testing'

describe('QuoteListComponent', () => {
  let component: QuoteListComponent
  let fixture: ComponentFixture<QuoteListComponent>

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
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
