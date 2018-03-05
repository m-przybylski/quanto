import { Component } from '@angular/core'
import { Company } from '../../../core/company/company'
import { Quote } from '@angular/compiler'
import { Product } from '../../../core/product/products'
import { Client } from '../../../core/quote/quote'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'qto-quote-edit',
  templateUrl: './quote-edit.component.html',
  styleUrls: ['./quote-edit.component.scss'],
})
export class QuoteEditComponent {
  companyList: Company[]
  quote: Quote
  productList: Product[]
  clientList: Client[]
  nextID: number

  constructor(router: ActivatedRoute) {
    this.companyList = router.snapshot.data.company
    this.productList = router.snapshot.data.products
    this.clientList = router.snapshot.data.clients
    this.quote = router.snapshot.data.quote
    this.nextID = router.snapshot.data.nextID
  }
}
