import { Deceiver } from 'deceiver-core'
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'
import { of } from 'rxjs/observable/of'

export const AngularFireAuthMock = () => {
  const angularFireAuth = Deceiver(AngularFireAuth)
  ;(<any>angularFireAuth).auth = {
    currentUser: {},
  }
  ;(<any>angularFireAuth).authState = of({ photoURL: '{}' })
  return angularFireAuth
}
export const AngularFirestoreMock = () => Deceiver(AngularFireDatabase)
