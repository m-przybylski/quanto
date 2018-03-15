import { TestBed, inject } from '@angular/core/testing'

import { UserService } from './user.service'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireAuthMock } from '../common.test'

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {
          provide: AngularFireAuth,
          useFactory: AngularFireAuthMock,
        },
      ],
    })
  })

  it(
    'should be created',
    inject([UserService], (service: UserService) => {
      expect(service).toBeTruthy()
    }),
  )
})
