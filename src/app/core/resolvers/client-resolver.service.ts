import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { QuoteService } from '../quote/quote.service'
import { Client } from '../quote/quote'
import { Observable } from 'rxjs/Observable'
import { take } from 'rxjs/operators'

@Injectable()
export class ClientResolverService implements Resolve<Client[]> {
  constructor(private quoteService: QuoteService) {}

  resolve(): Observable<Client[]> {
    return this.quoteService.getClientList().pipe(take(1))
  }
}
