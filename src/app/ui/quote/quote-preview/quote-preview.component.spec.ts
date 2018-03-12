import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuotePreviewComponent } from './quote-preview.component'
import { ButtonModule } from 'primeng/button'
import {
  DialogService,
  DIALOG_DATA,
} from '../../../shared/dialog/dialog.service'
import { DialogOverlayRef } from '../../../shared/dialog/dialog-overlay-ref'
import { PdfService } from '../../../core/pdf/pdf.service'
import { Deceiver } from 'deceiver-core'

describe('QuotePreviewComponent', () => {
  let component: QuotePreviewComponent
  let fixture: ComponentFixture<QuotePreviewComponent>
  const pdfServiceMock: PdfService = Deceiver(PdfService)
  let generatePdfFromHTML, generateDocFromHTML: jasmine.Spy

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ButtonModule],
        declarations: [QuotePreviewComponent],
        providers: [
          { provide: PdfService, useValue: pdfServiceMock },
          DialogService,
          {
            provide: DialogOverlayRef,
            useValue: new DialogOverlayRef(undefined),
          },
          {
            provide: DIALOG_DATA,
            useValue: { id: 1 },
          },
        ],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotePreviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    generatePdfFromHTML = spyOn(
      fixture.debugElement.injector.get(PdfService),
      'generatePdfFromHTML',
    ).and.stub()
    generateDocFromHTML = spyOn(
      fixture.debugElement.injector.get(PdfService),
      'generateDocFromHTML',
    ).and.stub()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should call pdf service', () => {
    component.getPDF('1234', new Date('2018/03/03'))
    expect(generatePdfFromHTML.calls.any()).toEqual(true)
    component.getPDF('1234', new Date('2018/11/03'))
    expect(generatePdfFromHTML).toHaveBeenCalledWith(
      'Quote.1.2018-11-03',
      '1234',
    )
    component.getPDF('1234', new Date('2018/05/22'))
    expect(generatePdfFromHTML).toHaveBeenCalledWith(
      'Quote.1.2018-05-22',
      '1234',
    )
  })
  it('should call docx service', () => {
    component.getDoc('some value', new Date('2018/11/03'))
    expect(generateDocFromHTML.calls.mostRecent().args).toEqual([
      'Quote.1.2018-11-03',
      'some value',
    ])
  })
})
