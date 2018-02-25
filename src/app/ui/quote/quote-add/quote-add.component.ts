import { Component, ChangeDetectionStrategy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Product } from '../../../core/product/products'
import { Router, ActivatedRoute } from '@angular/router'
import { QuoteService } from '../../../core/quote/quote.service'
import { Quote } from '../../../core/quote/quote'
import { Company } from '../../../core/company/company'

@Component({
  selector: 'qto-quote-add',
  templateUrl: './quote-add.component.html',
  styleUrls: ['./quote-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteAddComponent {
  public quote: FormGroup
  public products: Product[]
  public company: Company
  public nextID: number
  public disabled = true
  constructor(
    private quoteService: QuoteService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.company = this.route.snapshot.data.company
    this.products = this.route.snapshot.data.products
    this.nextID = this.route.snapshot.data.nextID

    this.quote = new FormGroup({
      companyCrtl: new FormControl(this.company[0], {
        validators: Validators.required,
      }),
      quoteNumberCtrl: new FormControl({ value: this.nextID, disabled: true }),
      expirationDateCtrl: new FormControl(),
      preparedByCtrl: new FormControl(),
      clientCtrl: new FormControl(),
      productCrtl: new FormControl(this.products[0]),
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
