import { TestBed, inject } from '@angular/core/testing'

import { ProductService } from './product.service'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore'
import { Deceiver } from 'deceiver-core'
import { Product } from './products'

import { of } from 'rxjs/observable/of'

const ProductList: Product[] = [
  {
    id: 1,
    name: 'name',
    price: 12,
  },
  {
    id: 2,
    name: 'name 2',
    price: 13,
  },
]

describe('ProductService', () => {
  const AngularFirestoreMock = Deceiver(AngularFirestore)
  const angularFirestoreCollection = Deceiver(AngularFirestoreCollection)
  let collectionCall
  let returnProducts
  let addProduct
  let service: ProductService
  beforeEach(() => {
    returnProducts = angularFirestoreCollection.valueChanges = jasmine
      .createSpy('getProducts')
      .and.returnValues(of(ProductList))
    addProduct = angularFirestoreCollection.add = jasmine
      .createSpy('addProduct')
      .and.stub()
    collectionCall = AngularFirestoreMock.collection = jasmine
      .createSpy()
      .and.callFake(collection => angularFirestoreCollection)
    service = new ProductService(AngularFirestoreMock)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should get list of products', () => {
    service
      .getProducts()
      .subscribe(products => expect(products).toEqual(ProductList))
    expect(collectionCall).toHaveBeenCalledWith('products')
  })
  it('should add product to list', () => {
    const product: Product = {
      name: 'new product',
      price: 12,
    }
    const newProdList = ProductList.concat({ ...product, id: 3 })
    returnProducts = angularFirestoreCollection.valueChanges = jasmine
      .createSpy()
      .and.returnValues(of(ProductList))

    returnProducts = angularFirestoreCollection.valueChanges = jasmine
      .createSpy('getProducts')
      .and.returnValues(of(newProdList))

    service.addProduct(product)
    expect(addProduct).toHaveBeenCalledWith(product)
    service.getProducts().subscribe(prods => expect(prods).toEqual(newProdList))
  })

  xit('should get product of specific ID', async () => {
    let product = await service.getProductById(0)
    expect(product).toEqual({})
    product = await service.getProductById(1)
    expect(product).toEqual({ id: 1, name: 'name', price: 12 })
  })
})
