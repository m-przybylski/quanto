import { TestBed, inject } from '@angular/core/testing'
import { LoginGuardService } from './login-guard.service'

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuardService],
    })
  })

  xit(
    'should be created',
    inject([LoginGuardService], (service: LoginGuardService) => {
      expect(service).toBeTruthy()
    }),
  )
})