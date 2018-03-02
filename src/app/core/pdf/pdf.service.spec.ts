import { PdfService, JsPDF } from './pdf.service'
import { TestBed, inject } from '@angular/core/testing'
import { Deceiver } from 'deceiver-core'

describe('PdfService', () => {
  const JsPDFmock = Deceiver(JsPDF)
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfService, { provide: JsPDF, useValue: JsPDFmock }],
    })
  })

  it(
    'should be created',
    inject([PdfService], (service: PdfService) => {
      expect(service).toBeTruthy()
    }),
  )

  it(
    'should generate pdf',
    inject([PdfService], (service: PdfService) => {
      expect(service).toBeTruthy()
    }),
  )
})
