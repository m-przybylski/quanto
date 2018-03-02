import { Component, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Quote } from '../../../core/quote/quote'
import { PdfService } from '../../../core/pdf/pdf.service'

@Component({
  selector: 'qto-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteListComponent {
  public quotes: Quote[]
  constructor(route: ActivatedRoute, private pdf: PdfService) {
    this.quotes = route.snapshot.data.quotes
  }

  public generatePDF(quoteId, date = new Date()) {
    const fileName = `Quote.${quoteId}.${this.generateDateString(date)}`

    this.pdf.generatePdf(
      fileName,
      this.quotes.find(quote => quote.id === quoteId),
    )
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
