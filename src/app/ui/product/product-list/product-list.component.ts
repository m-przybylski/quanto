import { Component, ChangeDetectionStrategy } from '@angular/core'
import { ProductService } from '../../../core/product/product.service'
import { Product } from '../../../core/product/products'

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
}
