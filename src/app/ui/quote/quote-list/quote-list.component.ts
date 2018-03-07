import { Component, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Quote } from '../../../core/quote/quote'
import { Currency, Product } from '../../../core/product/products'
import { DialogService } from '../../../shared/dialog/dialog.service'
import { QuotePreviewComponent } from '../quote-preview/quote-preview.component'

@Component({
  selector: 'qto-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteListComponent {
  public quotes: Quote[]
  constructor(route: ActivatedRoute, private dialog: DialogService) {
    this.quotes = route.snapshot.data.quotes
  }

  public openPreview(quoteId) {
    this.dialog.open(QuotePreviewComponent, {
      data: this.quotes.find(quote => quote.id === quoteId),
    })
  }
  public getPrice(
    product: Product,
    currency: Currency,
    quantity: number = 1,
  ): string {
    let price = product.price.find(curPrice => curPrice.currency === currency)
    if (!price) {
      price = product.price[0]
    }
    return this.formatPrice(price.price * quantity, price.currency)
  }
  public getTotalSum(
    products: { product: Product; quantity: number }[],
    currency: Currency,
  ) {
    let reducedPrice = 0
    try {
      reducedPrice = products.reduce((acc, curr) => {
        const price = curr.product.price.find(
          curPrice => curPrice.currency === currency,
        )
        if (!price) {
          throw new Error('No currency found to calculate total')
        }
        return acc + price.price * curr.quantity
      }, 0)
    } catch {
      return ''
    }
    return this.formatPrice(reducedPrice, currency)
  }
  private formatPrice(price: number, currency: Currency) {
    if (currency === 'USD') {
      return `${currency} ${price}`
    } else {
      return `${price} ${currency}`
    }
  }
}
