import * as JSPDF from 'jspdf'
import { Injectable, Inject } from '@angular/core'
import { PDFConfig } from './interfaces/tokens'
import { JSPDFConfig } from './interfaces/js-pdf-config'

@Injectable()
export class JsPDF extends JSPDF {
  public config
  constructor(@Inject(PDFConfig) config: JSPDFConfig) {
    let orientation, unit, format, compressPdf
    ;({ orientation, unit, format, compressPdf } = config)
    super(orientation, unit, format, compressPdf)
  }
}
