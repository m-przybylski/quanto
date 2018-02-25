import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Product, Price } from '../../../core/product/products'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'qto-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  productList: Product[]
  constructor(route: ActivatedRoute) {
    this.productList = route.snapshot.data.products
  }

  public getPrice(prices: Price[], currency: string): string {
    if (prices) {
      const priceFound = prices.find(price => price.currency === currency)
      if (priceFound) {
        return priceFound.price.toString()
      }
      return '-'
    }
    return '-'
  }
}
