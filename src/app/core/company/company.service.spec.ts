import { TestBed, inject } from '@angular/core/testing'

import { CompanyService } from './company.service'
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuthMock, AngularFirestoreMock } from '../common.test'
import { AngularFireAuth } from 'angularfire2/auth'

describe('CompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompanyService,
        {
          provide: AngularFireDatabase,
          useFactory: AngularFirestoreMock,
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
})
