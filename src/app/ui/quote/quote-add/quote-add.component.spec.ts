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

describe('QuoteAddComponent', () => {
  let component: QuoteAddComponent
  let fixture: ComponentFixture<QuoteAddComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ButtonModule,
          HeaderModule,
          RouterTestingModule,
          ReactiveFormsModule,
          DropdownModule,
          CalendarModule,
          AutoCompleteModule,
        ],
        declarations: [QuoteAddComponent],
        providers: [
          QuoteService,
          {
            provide: AngularFireAuth,
            useFactory: AngularFireAuthMock,
          },
          {
            provide: AngularFireDatabase,
            useFactory: AngularFirestoreMock,
          },
        ],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteAddComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  xit('should create', () => {
    expect(component).toBeTruthy()
  })
})
