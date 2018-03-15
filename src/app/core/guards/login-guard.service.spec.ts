import { TestBed, inject } from '@angular/core/testing'
import { LoginGuardService } from './login-guard.service'
import { AngularFireAuthMock } from '../common.test'
import { AngularFireAuth } from 'angularfire2/auth'

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginGuardService,
        { provide: AngularFireAuth, useFactory: AngularFireAuthMock },
      ],
    })
  })

  it(
    'should be created',
    inject([LoginGuardService], (service: LoginGuardService) => {
      expect(service).toBeTruthy()
    }),
  )
})
