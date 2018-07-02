import { TestBed, inject } from '@angular/core/testing'

import { QuoteService } from './quote.service'
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuthMock, AngularFirestoreMock } from '../common.test'
import { AngularFireAuth } from 'angularfire2/auth'
import { Quote, Client } from './quote'
import { Product } from '../product/products'
import { of } from 'rxjs'

const productList: Product[] = [
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
const client: Client = {
  name: 'client 1',
  bill: {
    city: '',
    contanctAddress: '',
    contanctEmail: '',
    country: '',
    postalCode: '',
    contanctName: '',
    name: '',
  },
  ship: {
    city: '',
    contanctAddress: '',
    contanctEmail: '',
    country: '',
    postalCode: '',
    contanctName: '',
    name: '',
  },
}

const quoteList: Quote[] = [
  {
    id: 10,
    client: { ...client },
    company: { name: 'company 1', address: '' },
    created: new Date('11/10/2018'),
    expiration: undefined,
    currency: 'USD',
    preparedBy: 'janusz',
    products: [{ product: productList[0], quantity: 10, discount: 0 }],
  },
  {
    id: 20,
    client: { ...client },
    company: { name: '', address: '' },
    created: new Date('11/10/2018'),
    expiration: new Date('5/4/2018'),
    currency: 'USD',
    preparedBy: 'janusz',
    products: [
      { product: productList[0], quantity: 10 },
      { product: productList[1], quantity: 20 },
    ],
  },
]

const quoteToDatabase = [
  {
    id: 10,
    company: 'company 1',
    created:
      'Sat Nov 10 2018 00:00:00 GMT+0100 (Central European Standard Time)',
    expiration: '',
    client: 'client 1',
    preparedBy: 'janusz',
    currency: 'USD',
    products: [{ product: '123', quantity: 10, discount: 0 }],
  },
  {
    id: 20,
    company: '',
    created:
      'Sat Nov 10 2018 00:00:00 GMT+0100 (Central European Standard Time)',
    expiration:
      'Fri May 04 2018 00:00:00 GMT+0200 (Central European Daylight Time)',
    client: 'client 1',
    preparedBy: 'janusz',
    currency: 'USD',
    products: [
      { product: '123', quantity: 10, discount: 0 },
      { product: '1234', quantity: 20, discount: 0 },
    ],
  },
]

let listSpy: jasmine.Spy

let setQuoteMethod: jasmine.Spy
let setClientMethod: jasmine.Spy

let getObjectQuoteMethod: jasmine.Spy
let getObjectCompanyMethod: jasmine.Spy
let getObjectClientMethod: jasmine.Spy
let getObjectProductMethod: jasmine.Spy

let getObject: jasmine.Spy

describe('QuoteService', () => {
  const firebaseMock = AngularFirestoreMock()
  beforeEach(() => {
    setQuoteMethod = jasmine.createSpy().and.stub()
    setClientMethod = jasmine.createSpy().and.stub()
    getObjectQuoteMethod = jasmine
      .createSpy()
      .and.returnValue(of(quoteToDatabase[0]))
    getObjectCompanyMethod = jasmine
      .createSpy()
      .and.returnValue(of({ name: 'company 1', address: '' }))
    getObjectClientMethod = jasmine.createSpy().and.returnValue(of(client))
    getObjectProductMethod = jasmine
      .createSpy()
      .and.returnValue(of(productList[0]))

    getObject = jasmine.createSpy().and.callFake((params: string) => {
      if (params.includes('quote')) {
        return { valueChanges: getObjectQuoteMethod }
      } else if (params.includes('client')) {
        return { valueChanges: getObjectClientMethod }
      } else if (params.includes('company')) {
        return { valueChanges: getObjectCompanyMethod }
      } else if (params.includes('products')) {
        return { valueChanges: getObjectProductMethod }
      }
    })

    firebaseMock.list = listSpy = jasmine
      .createSpy()
      .and.callFake((params: string) => {
        if (params.includes('quote')) {
          return {
            valueChanges: _ => of(quoteList),
            set: setQuoteMethod,
          }
        } else if (params.includes('client')) {
          return {
            valueChanges: _ => of(client),
            set: setClientMethod,
          }
        }
      })
    firebaseMock.object = getObject
    TestBed.configureTestingModule({
      providers: [
        QuoteService,
        { provide: AngularFireAuth, useFactory: AngularFireAuthMock },
        { provide: AngularFireDatabase, useValue: firebaseMock },
      ],
    })
  })

  it('should be created', inject([QuoteService], (service: QuoteService) => {
    expect(service).toBeTruthy()
  }))

  it('should add quote to databse', inject(
    [QuoteService],
    (service: QuoteService) => {
      service.addQuote(quoteList[0])
      expect(setQuoteMethod.calls.count()).toBe(
        1,
        'one for client, one for quote',
      )
      expect(setQuoteMethod.calls.first().args).toEqual([
        '10',
        quoteToDatabase[0],
      ])
      service.addQuote(quoteList[1])
      expect(setQuoteMethod.calls.mostRecent().args).toEqual([
        '20',
        quoteToDatabase[1],
      ])
    },
  ))
  it('should get quote by ID from database', inject(
    [QuoteService],
    (service: QuoteService) => {
      service.getQuote(10).subscribe(quote => {
        expect(quote).toEqual([
          <any>{
            id: 10,
            client: { ...client },
            company: { name: 'company 1', address: '' },
            created:
              'Sat Nov 10 2018 00:00:00 GMT+0100 (Central European Standard Time)',
            expiration: '',
            currency: 'USD',
            preparedBy: 'janusz',
            products: [{ product: productList[0], quantity: 10, discount: 0 }],
          },
        ])
      })
      expect(getObject.calls.first().args.length).toBe(
        1,
        'should have one parameter',
      )
      expect(getObject.calls.first().args[0].includes('/quote/10')).toBeTruthy(
        `should be called with parameter 10, but was calles ${
          getObject.calls.mostRecent().args[0]
        }`,
      )
      expect(getObjectQuoteMethod).toHaveBeenCalled()
    },
  ))
  it('should tertive new ID', inject(
    [QuoteService, AngularFireDatabase],
    (service: QuoteService) => {
      const listCallsCount = listSpy.calls.count()
      service.getNewID().subscribe(newID => {
        expect(newID).toBe(11)
      })
      expect(listSpy.calls.count()).toBe(listCallsCount + 1, 'called once more')
    },
  ))
  it('should return client list in form of an array', inject(
    [QuoteService],
    (service: QuoteService) => {
      const listCallsCount = listSpy.calls.count()
      service.getClientList().subscribe(clientList => {
        expect(clientList).toEqual(<any>client)
      })
      expect(listSpy.calls.count()).toBe(listCallsCount, 'not called any more')
    },
  ))
})
