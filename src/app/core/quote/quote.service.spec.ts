import { TestBed, inject } from '@angular/core/testing'

import { QuoteService } from './quote.service'
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuthMock, AngularFirestoreMock } from '../common.test'
import { AngularFireAuth } from 'angularfire2/auth'

describe('QuoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuoteService,
        { provide: AngularFireAuth, useFactory: AngularFireAuthMock },
        { provide: AngularFireDatabase, useFactory: AngularFirestoreMock },
      ],
    })
  })

  it(
    'should be created',
    inject([QuoteService], (service: QuoteService) => {
      expect(service).toBeTruthy()
    }),
  )
})
