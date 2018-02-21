import { Injectable } from '@angular/core'
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database'
import { ProductCategory } from './products'
import { Observable } from 'rxjs/Observable'

import { map } from 'rxjs/operators'

@Injectable()
export class ProductCategoryService {
  private productCategories: AngularFireList<ProductCategory>
  constructor(private database: AngularFireDatabase) {
    this.productCategories = this.database.list<ProductCategory>(
      'productCategory',
    )
  }

  // private _syncCategory() {
  //   values.map(value => {
  //     this.database
  //       .list('productCategory', ref =>
  //         ref.orderByChild('name').equalTo(value.name),
  //       )
  //       .valueChanges()
  //       .subscribe(val => {
  //         if (val.length === 0) {
  //           this.productCategories.push(value)
  //           console.log('pushed')
  //         }
  //       })
  //   })
  // }

  public getProductCategories(): Observable<ProductCategory[]> {
    return this.productCategories.snapshotChanges().pipe(
      map(productsSnapshot =>
        productsSnapshot.map(productSnapshot => ({
          id: productSnapshot.key,
          ...productSnapshot.payload.val(),
        })),
      ),
    )
  }
}

// const values = [
//   { name: 'Software', description: 'Software' },
//   { name: 'Hardware', description: 'Hardware' },
//   { name: 'Support', description: 'Support' },
//   { name: 'Consulting', description: 'Consulting' },
//   { name: 'Training', description: 'Training' },
//   { name: 'Shipping', description: 'Shipping' },
// ]
