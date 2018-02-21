import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Product } from './products'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { ProductCategoryService } from './product-category.service'

@Injectable()
export class ProductService {
  private productList: AngularFireList<Product>
  constructor(
    private database: AngularFireDatabase,
    private _productCategory: ProductCategoryService,
  ) {
    this.productList = this.database.list<Product>('products')
  }

  public getProducts(): Observable<Product[]> {
    this._productCategory.getProductCategories()
    return this.productList.snapshotChanges().map(productsSnapshot =>
      productsSnapshot.map(productSnapshot => ({
        id: productSnapshot.key,
        ...productSnapshot.payload.val(),
      })),
    )
  }
  /**this can be done better
   * use streem to kill other streem maybe?
   * maybe drop Promise??
   */
  public addProduct(product: Product): Promise<void> {
    return new Promise((resolve, reject) => {
      const sub = this.database
        .list('products', ref => ref.orderByChild('sku').equalTo(product.sku))
        .valueChanges()
        .subscribe(dbProduct => {
          if (dbProduct.length > 0) {
            reject('Product with sku already exists')
          } else {
            this.productList.push(product)
            resolve()
          }
          sub.unsubscribe()
        })
    })
  }

  public getProductById(key: string): Observable<Product[]> {
    return this.database
      .list<Product>('products', ref => ref.orderByKey().equalTo(key))
      .valueChanges()
  }
}
