import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { Product } from '../product/products'
import { ProductService } from '../product/product.service'
import { take } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class ProductResolverService implements Resolve<Product[]> {
  resolve(): Observable<Product[]> {
    return this.productService.getProducts().pipe(take(1))
  }
  constructor(private productService: ProductService) {}
}
