import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuoteEditComponent } from './quote-edit.component'
import { QuoteFormComponent } from '../quote-form/quote-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'
import { CalendarModule } from 'primeng/calendar'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { MessageService } from 'primeng/components/common/messageservice'

describe('QuoteEditComponent', () => {
  let component: QuoteEditComponent
  let fixture: ComponentFixture<QuoteEditComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          DropdownModule,
          CalendarModule,
          AutoCompleteModule,
        ],
        declarations: [QuoteEditComponent, QuoteFormComponent],
        providers: [MessageService],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  xit('should create', () => {
    expect(component).toBeTruthy()
  })
})
