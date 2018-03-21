import { TestBed, inject } from '@angular/core/testing'

import { CompanyService } from './company.service'
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuthMock, AngularFirestoreMock } from '../common.test'
import { AngularFireAuth } from 'angularfire2/auth'
import { of } from 'rxjs/observable/of'
import { Company } from './company'

const companyFlush = {
  'company 1': {
    name: 'company 1',
    address: 'company 1 address',
  },
  'company 2': {
    name: 'company 1',
    address: 'company 1 address',
  },
}
const companyOutput: Company[] = [
  {
    name: 'company 1',
    address: 'company 1 address',
  },
  {
    name: 'company 1',
    address: 'company 1 address',
  },
]

describe('CompanyService', () => {
  let database
  let set
  beforeEach(() => {
    ;(set = jasmine.createSpy().and.returnValue(Promise.resolve())),
      (database = AngularFirestoreMock())
    database.object = _ => ({
      valueChanges: jasmine.createSpy().and.returnValue(of(companyFlush)),
    })
    database.list = _ => ({ set })
    TestBed.configureTestingModule({
      providers: [
        CompanyService,
        {
          provide: AngularFireDatabase,
          useValue: database,
        },
        {
          provide: AngularFireAuth,
          useFactory: AngularFireAuthMock,
        },
      ],
    })
  })

  it(
    'should be created',
    inject([CompanyService], (service: CompanyService) => {
      expect(service).toBeTruthy()
    }),
  )
  it(
    'should return company ',
    inject([CompanyService], (service: CompanyService) => {
      service.getCompanyObject().subscribe(companyList => {
        expect(companyList).toEqual(companyOutput)
      })
    }),
  )
  it(
    'should call company update',
    inject([CompanyService], (service: CompanyService) => {
      service.updateCompany(companyOutput[0])
      expect(set).toHaveBeenCalledWith(companyOutput[0].name, companyOutput[0])
    }),
  )
})
