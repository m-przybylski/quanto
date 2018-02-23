import { Component, ChangeDetectionStrategy } from '@angular/core'
import { QuoteService } from '../../../core/quote/quote.service'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'qto-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteListComponent {
  public quotes$: Observable<any[]>
  constructor(private quoteService: QuoteService) {
    this.quotes$ = this.quoteService.getQuoteList()
  }

  public generatePDF() {
    console.log('whooops, not implementes')
  }
}
