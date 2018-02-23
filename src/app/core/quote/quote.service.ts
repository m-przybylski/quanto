import { Injectable } from '@angular/core'
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'
import { Quote } from './quote'

@Injectable()
export class QuoteService {
  private quoteList: AngularFireList<any>
  constructor(private database: AngularFireDatabase) {
    this.quoteList = this.database.list<Quote>('quote')
  }

  public getQuoteList(): Observable<Quote[]> {
    return this.quoteList.valueChanges()
  }

  public addQuote(quote: Quote) {
    return this.quoteList.push(quote)
  }
}
