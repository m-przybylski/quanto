import { PdfService } from './pdf.service'
import { Deceiver } from 'deceiver-core'
import { JsPDF } from './js-pdf.service'

describe('PdfService', () => {
  const JsPDFmock = Deceiver(JsPDF)
  const saveFunction = (JsPDFmock.save = jasmine.createSpy('saveFinction'))
  let service: PdfService
  beforeEach(() => {
    service = new PdfService(JsPDFmock)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should generate pdf', () => {
    service.generatePdf('someName', null)
    expect(saveFunction).toHaveBeenCalledWith('someName')
  })
})
