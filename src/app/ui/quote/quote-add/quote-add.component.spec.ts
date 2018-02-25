import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuoteAddComponent } from './quote-add.component'

describe('QuoteAddComponent', () => {
  let component: QuoteAddComponent
  let fixture: ComponentFixture<QuoteAddComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [QuoteAddComponent],
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
