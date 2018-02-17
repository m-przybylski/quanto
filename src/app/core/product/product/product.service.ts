import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'
import { Product } from './products'

@Injectable()
export class ProductService {
  productCollection: AngularFirestoreCollection<Product>
  constructor(private database: AngularFirestore) {
    this.productCollection = this.database.collection<Product>('products')
  }

  public getProducts(): Observable<Product[]> {
    return this.productCollection.valueChanges()
  }

  public addProduct(product: Product): void {
    this.productCollection.add(product)
  }

  public getProductById(id: number): Observable<Product> {
    return this.productCollection.doc<Product>(`products/${id}`).valueChanges()
  }
}
