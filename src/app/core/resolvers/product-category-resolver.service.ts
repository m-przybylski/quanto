import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { ProductCategory } from '../product/products'
import { Observable } from 'rxjs/Observable'
import { ProductService } from '../product/product.service'
import { take } from 'rxjs/operators'

@Injectable()
export class ProductCategoryResolverService
  implements Resolve<ProductCategory[]> {
  constructor(private productService: ProductService) {}
  resolve(): Observable<ProductCategory[]> {
    return this.productService.getProductCategories().pipe(take(1))
  }
}
