import { Component } from '@angular/core'
import { Company } from '../../../core/company/company'
import { Product } from '../../../core/product/products'
import { Client, Quote } from '../../../core/quote/quote'
import { MessageService } from 'primeng/components/common/messageservice'
import { ActivatedRoute, Router } from '@angular/router'
import { QuoteService } from '../../../core/quote/quote.service'

@Component({
  selector: 'qto-quote-edit',
  templateUrl: './quote-edit.component.html',
  styleUrls: ['./quote-edit.component.scss'],
})
export class QuoteEditComponent {
  public companyList: Company[]
  public quote: Quote
  public productList: Product[]
  public clientList: Client[]
  public nextID: number
  public currencyList

  constructor(
    route: ActivatedRoute,
    messageService: MessageService,
    private router: Router,
    private quoteService: QuoteService,
  ) {
    if (!route.snapshot.data.quote) {
      messageService.add({ severity: 'error', detail: 'No Quote Found' })
      router.navigate(['/quote'])
      return
    }
    this.companyList = route.snapshot.data.company
    this.productList = route.snapshot.data.products
    this.clientList = route.snapshot.data.clients
    this.quote = route.snapshot.data.quote[0]
    this.nextID = route.snapshot.data.nextID
    this.currencyList = route.snapshot.data.currency
  }

  public saveQuote(quoteOut) {
    this.quoteService.addQuote(quoteOut).then(() => {
      this.router.navigate(['/quote'])
    })
  }
}
