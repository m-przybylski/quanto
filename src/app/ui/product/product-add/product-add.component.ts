import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProductCategory } from '../../../core/product/products'

@Component({
  selector: 'qto-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent {
  public productCategoryList: ProductCategory[]
  constructor(private route: ActivatedRoute) {
    this.productCategoryList = this.route.snapshot.data.productCategories
  }
}
