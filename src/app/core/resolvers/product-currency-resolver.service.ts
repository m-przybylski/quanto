import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { Currency } from '../product/products'
import { Observable } from 'rxjs'
import { ProductService } from '../product/product.service'

@Injectable()
export class ProductCurrencyResolverService
  implements Resolve<{ label: string; value: Currency }[]> {
  constructor(private productService: ProductService) {}
  resolve(): Observable<{ label: string; value: Currency }[]> {
    return this.productService.getCurrency()
  }
}
