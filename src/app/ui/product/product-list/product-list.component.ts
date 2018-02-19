import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core'
import { ProductService } from '../../../core/product/product.service'
import { Product } from '../../../core/product/products'
import { Observable } from '@firebase/util'

@Component({
  selector: 'qto-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  productList: Product[]
  public products$
  constructor(private products: ProductService) {
    this.products$ = this.products.getProducts()
  }
}
