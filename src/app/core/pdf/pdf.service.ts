import { Injectable } from '@angular/core'
import { saveAs } from 'file-saver'
import * as html2pdf from 'html2pdf.js'
import * as htmlDocx from 'html-docx-js/dist/html-docx'

@Injectable()
export class PdfService {
  constructor() {}

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
      htmlDocx.asBlob(`<!DOCTYPE html> ${htmlElement.outerHTML}`),
      `${fileName}.docx`,
    )
  }
}
