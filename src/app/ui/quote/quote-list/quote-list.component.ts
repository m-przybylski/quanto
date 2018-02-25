import { Component, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Quote } from '../../../core/quote/quote'

@Component({
  selector: 'qto-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteListComponent {
  public quotes: Quote[]
  constructor(route: ActivatedRoute) {
    this.quotes = route.snapshot.data.quotes
  }

  public generatePDF() {
    console.log('whooops, not implementes')
  }
}
