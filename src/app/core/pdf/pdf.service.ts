import { Injectable } from '@angular/core'
import { JsPDF } from './js-pdf.service'
import { Quote } from '../quote/quote'

import * as html2pdf from 'html2pdf.js'
import * as htmlDocxJs from 'html-docx-js'
import * as saveAs from 'file-saver'

@Injectable()
export class PdfService {
  constructor(private jsPDF: JsPDF) {}

  public generatePdf(_fileName: string, quote: Quote) {
    if (quote) {
      this.jsPDF.text(quote.company.name, 0, 0)
    }
    this.jsPDF.save(_fileName)
  }

  public generatePdfFromHTML(fileName: string, htmlElement: HTMLElement) {
    html2pdf(htmlElement, {
      margin: 1,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    })
  }
  public generateDocFromHTML(fileName: string, htmlElement: HTMLElement) {
    saveAs(
      htmlDocxJs.asBlob(`<!DOCTYPE html> ${htmlElement.outerHTML}`),
      fileName,
    )
  }
}
