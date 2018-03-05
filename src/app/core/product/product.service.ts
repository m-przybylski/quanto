import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Product, ProductCategory, Price } from './products'
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from 'angularfire2/database'
import { map } from 'rxjs/operators'
import { AngularFireAuth } from 'angularfire2/auth'
import { forkJoin } from 'rxjs/observable/forkJoin'

@Injectable()
export class ProductService {
  private _productList: AngularFireList<ProductDatabase>
  private _productCategories: AngularFireObject<ProductCategoryDatabase>
  private _getProductBySKU$: (
    productSku: string,
  ) => AngularFireList<ProductDatabase>
  constructor(private database: AngularFireDatabase, auth: AngularFireAuth) {
    this._productList = this.database.list<ProductDatabase>(
      `${auth.auth.currentUser.uid}/products/`,
    )

    this._productCategories = this.database.object<ProductCategoryDatabase>(
      `${auth.auth.currentUser.uid}/productCategories/`,
    )
    this._getProductBySKU$ = productSku =>
      this.database.list<ProductDatabase>(
        `${auth.auth.currentUser.uid}/products/${productSku}`,
      )
  }

  public getProducts(): Observable<Product[]> {
    return forkJoin(
      this._productList.valueChanges(),
      this._productCategories.valueChanges(),
    ).pipe(map(this.mapProductDatabaseToProduct))
  }
  public getProductCategories(): Observable<ProductCategory[]> {
    return this._productCategories
      .valueChanges()
      .pipe(map(categories => this.mapAllCategories(categories)))
  }
  public getProductBySKU(sku: string): Observable<Product[]> {
    return forkJoin(
      this._getProductBySKU$(sku).valueChanges(),
      this._productCategories.valueChanges(),
    ).pipe(map(res => this.mapProductDatabaseToProduct(res)))
  }
  public getCurrency() {
    return [
      { label: 'USD', value: 'USD' },
      { label: 'EUR', value: 'EUR' },
      { label: 'PLN', value: 'PLN' },
    ]
  }
  public addEditProduct(product: Product): Promise<any> {
    const productToBeInserted: ProductDatabase = {
      sku: product.sku,
      name: product.name,
      description: product.description,
      price: product.price,
      categories: product.categories.reduce((acc, category) => {
        acc[category.name] = true
        return Object.assign({}, { ...acc })
      }, {}),
    }
    return this._productList.set(product.sku, productToBeInserted)
  }

  /**
   * function to create a list of name: string, description: string values that represents product categories
   * @param categories list of true/false values that that determines if specific category is assigned to our product
   * @param categoryList list od all categories
   */
  private mapCategories(
    categories: { [key: string]: boolean },
    categoryList: ProductCategoryDatabase,
  ): ProductCategory[] {
    const result: ProductCategory[] = []
    for (const category of Object.keys(categories)) {
      if (categories[category] && categoryList[category]) {
        result.push({
          name: category,
          ...categoryList[category],
        })
      }
    }
    return result
  }

  private mapProductDatabaseToProduct: (
    [products, categories]: [ProductDatabase[], ProductCategoryDatabase],
  ) => Product[] = ([products, categories]) => {
    console.log(products.length)
    return products.map(product => ({
      ...product,
      categories: this.mapCategories(product.categories, categories),
    }))
  }

  private mapAllCategories(
    categoryList: ProductCategoryDatabase,
  ): ProductCategory[] {
    const result: ProductCategory[] = []
    for (const category of Object.keys(categoryList)) {
      result.push({ name: category, ...categoryList[category] })
    }
    return result
  }
}

interface ProductDatabase {
  categories: { [key: string]: boolean }
  name: string
  sku: string
  price: Price[]
  description: string
}

interface ProductCategoryDatabase {
  [key: string]: { description: string }
}
