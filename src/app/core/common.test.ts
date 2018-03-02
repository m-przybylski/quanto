import { Deceiver } from 'deceiver-core'
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'

export const AngularFireAuthMock = () => Deceiver(AngularFireAuth)
export const AngularFirestoreMock = () => Deceiver(AngularFireDatabase)
