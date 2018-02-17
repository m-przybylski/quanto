import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core'
import { ProductService } from '../../../core/product/product.service'
import { Product } from '../../../core/product/products'

@Component({
  selector: 'qto-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  public productList: Product[]
  constructor(
    private products: ProductService,
    private cdr: ChangeDetectorRef,
  ) {
    this.products.getProducts().subscribe(prods => {
      this.productList = prods
      cdr.markForCheck()
    })
  }
}
