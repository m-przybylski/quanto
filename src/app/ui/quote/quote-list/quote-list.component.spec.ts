import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuoteListComponent } from './quote-list.component'

describe('QuoteListComponent', () => {
  let component: QuoteListComponent
  let fixture: ComponentFixture<QuoteListComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [QuoteListComponent],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  xit('should create', () => {
    expect(component).toBeTruthy()
  })
})
