import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { Quote } from '../quote/quote'
import { Observable } from 'rxjs/Observable'
import { QuoteService } from '../quote/quote.service'
import { take } from 'rxjs/operators'

@Injectable()
export class QuoteResolverService implements Resolve<Quote[]> {
  constructor(private quoteService: QuoteService) {}
  resolve(): Observable<Quote[]> {
    return this.quoteService.getQuoteList().pipe(take(1))
  }
}

@Injectable()
export class NewQuoteIDResolverService implements Resolve<number> {
  constructor(private quoteService: QuoteService) {}
  resolve(): Observable<number> {
    return this.quoteService.getNewID().pipe(take(1))
  }
}
