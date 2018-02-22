import { Component, ChangeDetectionStrategy } from '@angular/core'
import { ProductService } from '../../../core/product/product.service'
import { Product, Price } from '../../../core/product/products'

@Component({
  selector: 'qto-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  productList: Product[]
  public products$
  constructor(private products: ProductService) {
    this.products$ = this.products.getProducts()
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
