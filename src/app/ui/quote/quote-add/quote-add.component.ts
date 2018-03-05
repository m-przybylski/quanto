import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Product } from '../../../core/product/products'
import { Router, ActivatedRoute } from '@angular/router'
import { QuoteService } from '../../../core/quote/quote.service'
import { Quote, Client } from '../../../core/quote/quote'
import { Company } from '../../../core/company/company'

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
  public nextID: number
  public disabled = true
  constructor(
    private quoteService: QuoteService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.companyList = this.route.snapshot.data.company
    this.productList = this.route.snapshot.data.products
    this.clientList = this.route.snapshot.data.clients
    this.nextID = this.route.snapshot.data.nextID || 1
  }
  public addQuote(quote: Quote) {
    console.log(quote)
    // this.quoteService.addQuote(quote).then(() => {
    //   this.router.navigate(['/quote'])
    // })
  }
}
