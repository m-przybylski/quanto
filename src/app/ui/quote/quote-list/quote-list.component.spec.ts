import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuoteListComponent } from './quote-list.component'
import { ButtonModule } from 'primeng/button'
import { HeaderModule } from '../../../shared/header/header.module'
import { DataListModule } from 'primeng/datalist'
import { RouterTestingModule } from '@angular/router/testing'
import { PdfService } from '../../../core/pdf/pdf.service'
import { Deceiver } from 'deceiver-core'
import { Quote } from '../../../core/quote/quote'

describe('QuoteListComponent', () => {
  const quotes: Quote[] = [
    {
      id: 1,
      company: undefined,
      created: undefined,
      client: undefined,
      expiration: undefined,
      preparedBy: undefined,
      products: [],
    },
    {
      id: 2,
      company: undefined,
      created: undefined,
      client: undefined,
      expiration: undefined,
      preparedBy: undefined,
      products: [],
    },
  ]
  let component: QuoteListComponent
  let fixture: ComponentFixture<QuoteListComponent>
  const pdfServiceMock: PdfService = Deceiver(PdfService)
  const generateFunctionMock = (pdfServiceMock.generatePdf = jasmine
    .createSpy('create')
    .and.stub())
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
        providers: [{ provide: PdfService, useValue: pdfServiceMock }],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    component.quotes = quotes
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call pdf service', () => {
    component.generatePDF(1234, new Date('2018/03/03'))
    expect(generateFunctionMock).toHaveBeenCalledWith(
      'Quote.1234.2018-03-03',
      undefined,
    )
    component.generatePDF(1234, new Date('2018/11/03'))
    expect(generateFunctionMock).toHaveBeenCalledWith(
      'Quote.1234.2018-11-03',
      undefined,
    )
    component.generatePDF(1234, new Date('2018/05/22'))
    expect(generateFunctionMock).toHaveBeenCalledWith(
      'Quote.1234.2018-05-22',
      undefined,
    )
  })

  it('should find quote and pass it to service', () => {
    component.generatePDF(1, new Date('2018/05/22'))
    expect(generateFunctionMock).toHaveBeenCalledWith(
      'Quote.1.2018-05-22',
      quotes[0],
    )
  })
})
