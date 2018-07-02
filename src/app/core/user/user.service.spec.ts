import { UserService } from './user.service'
import { AngularFireAuthMock } from '../common.test'
import { of } from 'rxjs'

describe('UserService', () => {
  let service: UserService
  const authMock = AngularFireAuthMock()
  ;(<any>authMock).authState = of({ photoURL: '{"key":"val"}' })
  ;(<any>authMock).auth.currentUser.updateProfile = _ => Promise.resolve()
  let updateProfile: jasmine.Spy

  beforeEach(() => {
    updateProfile = spyOn(
      authMock.auth.currentUser,
      'updateProfile',
    ).and.callThrough()
    service = new UserService(authMock)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should initialize with correct data', () => {
    service.userTheme().subscribe(value => {
      expect(value).toEqual('val')
    })
  }),
    it('should update user and resolve promise', async () => {
      await service
        .updateUser({ key: 'something', label: 'something else' }, 'Julian')
        .then(_ => {
          expect(updateProfile.calls.count()).toBe(1)
          expect(updateProfile.calls.argsFor(0)).toEqual([
            {
              displayName: 'Julian',
              photoURL: '{"key":"something","label":"something else"}',
            },
          ])
        })
      service.userTheme().subscribe(value => {
        expect(value).toEqual('something')
      })
    })
})

describe('UserService with no user logged in', () => {
  let service: UserService
  const authMock = AngularFireAuthMock()
  ;(<any>authMock).authState = of(null)
  beforeEach(() => {
    service = new UserService(authMock)
  })

  it('should initialize with correct data', () => {
    expect(service.currentUser).toBeFalsy()
  })
})
