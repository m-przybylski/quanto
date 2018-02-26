import { Injectable } from '@angular/core'
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'
import { Quote, Client } from './quote'
import { AngularFireAuth } from 'angularfire2/auth'
import { switchMap, mergeMap, take, reduce } from 'rxjs/operators'
import { from } from 'rxjs/observable/from'
import { Company } from '../company/company'
import { Product } from '../product/products'

@Injectable()
export class QuoteService {
  private quoteList: AngularFireList<QuoteDatabse>
  private clientList: AngularFireList<Client>
  constructor(
    private database: AngularFireDatabase,
    private auth: AngularFireAuth,
  ) {
    this.quoteList = this.database.list<QuoteDatabse>(
      `${auth.auth.currentUser.uid}/quote`,
    )
    this.clientList = this.database.list<Client>(
      `${auth.auth.currentUser.uid}/client`,
    )
  }

  /**overenginierd select... this is how you do joins in noSql...
   * but let my try to explain:
   * 1. change list of quotes to stream
   * 2. get company from DB and merge to out object passed down in the stream
   * 3. iterate over products and get product from DB.
   * 4. we need to do the same for customer.
   * btw take(1) is for reduce - make sure to close stream
   */
  public getQuoteList(): Observable<Quote[]> {
    return this.quoteList.valueChanges().pipe(
      take(1),
      switchMap(quoteList => from(quoteList)),
      mergeMap(
        quote =>
          this.database
            .object<Company>(
              `${this.auth.auth.currentUser.uid}/company/${quote.company}`,
            )
            .valueChanges()
            .pipe(take(1)),
        (quote, company) => Object.assign(quote, { company }),
      ),
      mergeMap(
        quote =>
          this.database
            .object<Client>(
              `${this.auth.auth.currentUser.uid}/client/${quote.client}`,
            )
            .valueChanges()
            .pipe(take(1)),
        (quote, client) => Object.assign(quote, { client }),
      ),
      mergeMap(
        quote =>
          from(quote.products).pipe(
            mergeMap(
              product =>
                this.database
                  .object<Product>(
                    `${this.auth.auth.currentUser.uid}/products/${
                      product.product
                    }`,
                  )
                  .valueChanges()
                  .pipe(take(1)),
              (quoteProduct, product) =>
                Object.assign(quoteProduct, { product }),
            ),
            reduce(
              (
                list: ProductQty & { product: Product }[],
                product: ProductQty & { product: Product },
              ) => [...list, product],
              [],
            ),
          ),
        (quote, products) => Object.assign(quote, { products }),
      ),
      reduce((acc: Quote[], value: any) => [...acc, value], []),
    )
  }
  public addQuote(quote: Quote): Promise<void> {
    const clientToInsert: Client = { ...quote.client }
    const quoteToInsert: QuoteDatabse = {
      id: quote.id,
      company: quote.company.name,
      created: quote.created,
      expiration: quote.expiration,
      client: quote.client.name,
      preparedBy: quote.preparedBy,
      products: quote.products.map(product => ({
        product: product.product.sku,
        quantity: product.quantity,
        discount: 0,
      })),
    }
    const setQuote = this.quoteList.set(quote.id.toString(), quoteToInsert)
    const setClient = this.clientList.set(quote.client.name, clientToInsert)
    return new Promise((resolve, reject) => {
      Promise.all([setQuote, setClient])
        .then(() => {
          resolve()
        })
        .catch(error => reject(error))
    })
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
  public getClientList(): Observable<Client[]> {
    return this.clientList.valueChanges()
  }
}

interface QuoteDatabse {
  id: number
  company: string
  created: Date
  expiration: Date
  preparedBy: string
  client: string
  products: ProductQty[]
}

interface ProductQty {
  product: string
  quantity: number
  discount: number
}
