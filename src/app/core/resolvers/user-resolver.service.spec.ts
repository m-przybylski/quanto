import { TestBed, inject } from '@angular/core/testing'

import { UserResolverService } from './user-resolver.service'
import { AngularFireAuth } from 'angularfire2/auth'

describe('UserResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserResolverService, AngularFireAuth],
    })
  })

  xit(
    'should be created',
    inject([UserResolverService], (service: UserResolverService) => {
      expect(service).toBeTruthy()
    }),
  )
})
