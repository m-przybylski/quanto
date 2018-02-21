import { ProductService } from './product.service'
import { AngularFireDatabase } from 'angularfire2/database'
import { Deceiver } from 'deceiver-core'
import { Product } from './products'

import { of } from 'rxjs/observable/of'

const ProductList: Product[] = [
  {
    id: '1',
    name: 'name',
    price: [{ currency: 'USD', price: 12 }],
    sku: '123',
    description: 'opus',
    category: '1',
  },
  {
    id: '2',
    name: 'name',
    price: [{ currency: 'USD', price: 12 }],
    sku: '123',
    description: 'opus',
    category: '1',
  },
]

describe('ProductService', () => {
  const AngularFirestoreMock = Deceiver(AngularFireDatabase)
  let collectionCall
  let service: ProductService
  beforeEach(() => {
    collectionCall = AngularFirestoreMock.list = jasmine
      .createSpy()
      .and.callFake(() =>
        jasmine.createSpyObj('list', {
          snapshotChanges: jasmine
            .createSpy('getProducts')
            .and.returnValues(of(ProductList)),
        }),
      )
    service = new ProductService(AngularFirestoreMock, undefined)
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
      price: [{ currency: 'USD', price: 12 }],
      category: '1',
      description: '',
      sku: '123',
    }
    const newProdList = ProductList.concat(product)
    service.addProduct(product)
    service.getProducts().subscribe(prods => expect(prods).toEqual(newProdList))
  })

  xit('should get product of specific ID', async () => {
    let product = await service.getProductById('0')
    expect(product).toEqual({})
    product = await service.getProductById('1')
    expect(product).toEqual({ id: 1, name: 'name', price: 12 })
  })
})
