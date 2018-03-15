import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Product } from '../../../core/product/products'
import { Router, ActivatedRoute } from '@angular/router'
import { QuoteService } from '../../../core/quote/quote.service'
import { Quote, Client } from '../../../core/quote/quote'
import { Company } from '../../../core/company/company'
import { MessageService } from 'primeng/components/common/messageservice'

@Component({
  selector: 'qto-quote-add',
  templateUrl: './quote-add.component.html',
  styleUrls: ['./quote-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteAddComponent {
  public productList: Product[]
  public companyList: Company[]
  public clientList: Client[]
  public currencyList
  public nextID: number
  public disabled = true
  constructor(
    private quoteService: QuoteService,
    private router: Router,
    private route: ActivatedRoute,
    private errorMessageService: MessageService,
  ) {
    this.companyList = this.route.snapshot.data.company
    this.productList = this.route.snapshot.data.products
    this.clientList = this.route.snapshot.data.clients
    this.nextID = this.route.snapshot.data.nextID || 1
    this.currencyList = route.snapshot.data.currency
    let errorFlag = false
    if (this.productList.length === 0) {
      errorFlag = true
      this.errorMessageService.add({
        severity: 'error',
        detail: 'There is no products please create one',
      })
    }
    if (this.companyList.length === 0) {
      errorFlag = true
      this.errorMessageService.add({
        severity: 'error',
        detail: 'Please provide company info',
      })
    }
    if (errorFlag) {
      this.router.navigate(['/quote'])
      return
    }
  }
  public addQuote(quote: Quote) {
    this.quoteService.addQuote(quote).then(() => {
      this.router.navigate(['/quote'])
    })
  }
}
