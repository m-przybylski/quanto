import { Injectable, InjectionToken, Inject } from '@angular/core'
import * as JSPDF from 'jspdf'
import { pageFormats } from './page-format'

export const PDFConfig = new InjectionToken<JSPDFConfig>(
  'PDF Configuration injected from module',
)

export interface JSPDFConfig {
  orientation: 'portrait' | 'landscape' | 'p' | 'l'
  unit: 'pt' | 'mm' | 'cm' | 'in'
  format: pageFormats
  compressPdf: boolean
}

@Injectable()
export class PdfService {
  jsPDF = new JSPDF()
  constructor() {}

  public generatePdf(fineName) {
    console.log('here')
    this.jsPDF.save(fineName)
  }
}
@Injectable()
export class JsPDF extends JSPDF {
  public config
  constructor(@Inject(PDFConfig) config: JSPDFConfig) {
    let orientation, unit, format, compressPdf
    ;({ orientation, unit, format, compressPdf } = config)
    super(orientation, unit, format, compressPdf)
  }
}
