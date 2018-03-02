import { Injectable } from '@angular/core'
import { JsPDF } from './js-pdf.service'
import { Quote } from '../quote/quote'

@Injectable()
export class PdfService {
  constructor(private jsPDF: JsPDF) {}

  public generatePdf(fineName: string, quote: Quote) {
    if (quote) {
      this.jsPDF.text(quote.company.name, 0, 0)
    }
    this.jsPDF.save(fineName)
  }
}
