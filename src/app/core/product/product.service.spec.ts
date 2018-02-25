import { ProductService } from './product.service'
import { AngularFireDatabase } from 'angularfire2/database'
import { Deceiver } from 'deceiver-core'
import { Product, ProductCategory } from './products'

import { of } from 'rxjs/observable/of'
import { AngularFireAuth } from 'angularfire2/auth'
import { async } from '@angular/core/testing'

const UserID = '1234'
const ProductList: Product[] = [
  {
    name: 'name',
    price: [{ currency: 'USD', price: 12 }],
    sku: '123',
    description: 'opus',
    categories: [{ name: 'Software', description: 'Software' }],
  },
  {
    name: 'name',
    price: [{ currency: 'USD', price: 12 }],
    sku: '1234',
    description: 'opus',
    categories: [{ name: 'Hardware', description: 'Hardware' }],
  },
]
const ProductDatabase = [
  {
    name: 'name',
    price: [{ currency: 'USD', price: 12 }],
    sku: '123',
    description: 'opus',
    categories: { Software: true },
  },
  {
    name: 'name',
    price: [{ currency: 'USD', price: 12 }],
    sku: '1234',
    description: 'opus',
    categories: { Hardware: true },
  },
]
const ProductCategoriesList: ProductCategory[] = [
  {
    name: 'Software',
    description: 'Software',
  },
  {
    name: 'Training',
    description: 'Training',
  },
  {
    name: 'Hardware',
    description: 'Hardware',
  },
]
const ProductCategoriesDatabase = {
  Software: {
    description: 'Software',
  },
  Training: {
    description: 'Training',
  },
  Hardware: {
    description: 'Hardware',
  },
}

describe('ProductService', () => {
  const AngularFirestoreMock = Deceiver(AngularFireDatabase)
  const AngularFireAuthMock = Deceiver(AngularFireAuth)
  // tslint:disable-next-line:whitespace
  ;(<any>AngularFireAuthMock).auth = { currentUser: { uid: UserID } }
  let callList
  let callObject
  let callSet
  let service: ProductService
  beforeEach(() => {
    callSet = jasmine.createSpy('setProduct').and.stub()
    callList = AngularFirestoreMock.list = jasmine
      .createSpy()
      .and.callFake(() => ({
        set: callSet,
        valueChanges: jasmine
          .createSpy('getProducts')
          .and.returnValue(of(ProductDatabase)),
      }))
    callObject = AngularFirestoreMock.object = jasmine.createSpy().and.callFake(
      () => ({
        valueChanges: jasmine
          .createSpy('productCategories')
          .and.returnValue(of(ProductCategoriesDatabase)),
      }),
      // jasmine.createSpyObj('object', {
      //   valueChanges: jasmine
      //     .createSpy('some name', () => of(ProductCategoriesDatabase))
      //     .and.returnValue(ProductCategoriesDatabase),
      // }),
    )
    service = new ProductService(AngularFirestoreMock, AngularFireAuthMock)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should get list of products', () => {
    service
      .getProducts()
      .subscribe(products => expect(products).toEqual(ProductList))
    expect(callObject).toHaveBeenCalledWith(`${UserID}/productCategories/`)
    expect(callList).toHaveBeenCalledWith(`${UserID}/products/`)
  })
  it('should add product to list', () => {
    const product: Product = {
      name: 'new product',
      price: [{ currency: 'USD', price: 12 }],
      categories: [
        { name: 'Software', description: 'Software' },
        { name: 'Training', description: 'Training' },
      ],
      description: '',
      sku: '123',
    }
    service.addEditProduct(product)
    expect(callSet).toHaveBeenCalledWith(product.sku, {
      name: 'new product',
      price: [{ currency: 'USD', price: 12 }],
      categories: { Software: true, Training: true },
      description: '',
      sku: '123',
    })
  })
  it(
    'should return product categories with name and description',
    async(() => {
      service.getProductCategories().subscribe(categories => {
        expect(categories).toEqual(ProductCategoriesList)
      })
    }),
  )
})
