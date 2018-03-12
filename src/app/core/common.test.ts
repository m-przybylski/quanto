import { Deceiver } from 'deceiver-core'
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'

export const AngularFireAuthMock = () => {
  const angularFireAuth = Deceiver(AngularFireAuth)
  ;(<any>angularFireAuth).auth = {
    currentUser: {},
  }
  return angularFireAuth
}
export const AngularFirestoreMock = () => Deceiver(AngularFireDatabase)
