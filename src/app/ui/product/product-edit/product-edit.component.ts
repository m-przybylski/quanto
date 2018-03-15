import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MessageService } from 'primeng/components/common/messageservice'
import { Product } from '../../../core/product/products'

@Component({
  selector: 'qto-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  public product: Product
  public productCategoryList: Product
  constructor(
    activatedRoute: ActivatedRoute,
    private message: MessageService,
    private router: Router,
  ) {
    this.product =
      activatedRoute.snapshot.data.product &&
      activatedRoute.snapshot.data.product.filter(
        product => product.sku === activatedRoute.snapshot.params.sku,
      )[0]
    this.productCategoryList = activatedRoute.snapshot.data.productCategories
  }
  ngOnInit() {
    if (!this.product) {
      this.message.add({ severity: 'error', detail: 'Product not found' })
      this.router.navigate(['/products'])
    }
  }
}
