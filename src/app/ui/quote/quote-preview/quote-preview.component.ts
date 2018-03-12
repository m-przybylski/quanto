import { Component, OnInit, Inject } from '@angular/core'
import { DialogOverlayRef } from '../../../shared/dialog/dialog-overlay-ref'
import { DIALOG_DATA } from '../../../shared/dialog/dialog.service'
import { PdfService } from '../../../core/pdf/pdf.service'
import { Quote } from '../../../core/quote/quote'

@Component({
  selector: 'qto-quote-preview',
  templateUrl: './quote-preview.component.html',
  styleUrls: ['./quote-preview.component.scss'],
})
export class QuotePreviewComponent implements OnInit {
  constructor(
    public dialogRef: DialogOverlayRef<QuotePreviewComponent>,
    @Inject(DIALOG_DATA) private quote: Quote,
    private pdfService: PdfService,
  ) {}

  ngOnInit() {}

  close() {
    this.dialogRef.close()
  }

  getPDF(content, date = new Date()) {
    const fileName = `Quote.${this.quote.id}.${this.generateDateString(date)}`
    this.pdfService.generatePdfFromHTML(fileName, content)
  }
  getDoc(content, date = new Date()) {
    const fileName = `Quote.${this.quote.id}.${this.generateDateString(date)}`
    this.pdfService.generateDocFromHTML(fileName, content)
  }

  private generateDateString(date: Date): string {
    const year = date.getFullYear()
    const month =
      date.getMonth() + 1 > 10
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1)
    const day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate()
    return `${year}-${month}-${day}`
  }
}
