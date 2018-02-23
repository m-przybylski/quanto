import { Component, ChangeDetectionStrategy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Observable } from 'rxjs/Observable'
import { Product } from '../../../core/product/products'
import { CompanyService } from '../../../core/company/company.service'
import { ProductService } from '../../../core/product/product.service'
import { Router } from '@angular/router'
import { QuoteService } from '../../../core/quote/quote.service'
import { Quote } from '../../../core/quote/quote'

@Component({
  selector: 'qto-quote-add',
  templateUrl: './quote-add.component.html',
  styleUrls: ['./quote-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteAddComponent {
  public console = console
  public quote: FormGroup
  public products$: Observable<Product[]>
  public company$: Observable<any>
  public disabled = true
  constructor(
    private companyService: CompanyService,
    private productService: ProductService,
    private quoteService: QuoteService,
    private router: Router,
  ) {
    this.company$ = this.companyService.getCompanyList()
    this.products$ = this.productService.getProducts()
    this.quote = new FormGroup({
      companyCrtl: new FormControl({
        validators: Validators.required,
      }),
      quoteNumberCtrl: new FormControl({ value: 1, disabled: true }),
      expirationDateCtrl: new FormControl(),
      preparedByCtrl: new FormControl(),
      clientCtrl: new FormControl(),
      productCrtl: new FormControl(),
    })
  }

  public addQuote() {
    // build Quote
    const quote: Quote = {
      id: this.quote.controls.quoteNumberCtrl.value,
      company: this.quote.controls.companyCrtl.value,
      products: [this.quote.controls.productCrtl.value],
    }
    this.quoteService.addQuote(quote).then(() => {
      this.router.navigate(['/quote'])
    })
  }
}
