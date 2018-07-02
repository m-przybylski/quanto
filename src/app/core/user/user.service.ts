import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { UserInfo } from 'firebase'
import { AngularFireAuth } from 'angularfire2/auth'

@Injectable()
export class UserService {
  private _currentUser: UserInfo
  private _userTheme: BehaviorSubject<string> = new BehaviorSubject('')
  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this._userTheme.next(this.parseJson(user.photoURL))
        this._currentUser = user
      } else {
        this._currentUser = null
      }
    })
  }
  userTheme(): Observable<string> {
    return this._userTheme.asObservable()
  }

  updateUser(
    newTheme: { key: string; label: string },
    userDisplayName: string,
  ): Promise<void> {
    return this.auth.auth.currentUser
      .updateProfile({
        displayName: userDisplayName,
        photoURL: JSON.stringify(newTheme),
      })
      .then(_ => {
        this._userTheme.next(newTheme.key)
        return Promise.resolve()
      })
  }
  get currentUser() {
    return this._currentUser
  }

  private parseJson(json: string): string {
    let result = ''
    try {
      result = JSON.parse(json).key
    } catch {
    } finally {
    }
    return result
  }
}
