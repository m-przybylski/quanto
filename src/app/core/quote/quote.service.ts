import { Injectable } from '@angular/core'
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'
import { Quote } from './quote'
import { AngularFireAuth } from 'angularfire2/auth'

@Injectable()
export class QuoteService {
  private quoteList: AngularFireList<any>
  constructor(
    private database: AngularFireDatabase,
    private auth: AngularFireAuth,
  ) {
    this.quoteList = this.database.list<Quote>(
      `${auth.auth.currentUser.uid}/quote`,
    )
  }

  public getQuoteList(): Observable<Quote[]> {
    return this.quoteList.valueChanges()
  }

  public addQuote(quote: Quote) {
    return this.quoteList.set(quote.id.toString(), quote)
  }

  public getNewID(): Observable<number> {
    /**
     * limit to last will return 1 or 0 quotes in form of array.
     * map to get only one element and retrive ID and incementy by 1
     */
    return this.database
      .list<Quote>(`${this.auth.auth.currentUser.uid}/quote`, ref =>
        ref.limitToLast(1),
      )
      .valueChanges()
      .map(quotes => quotes.map(quote => quote.id + 1)[0])
  }
}
