import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { AngularFireAuth } from 'angularfire2/auth'
import { User } from '@firebase/auth-types'
import { take } from 'rxjs/operators'

@Injectable()
export class UserResolverService implements Resolve<User> {
  constructor(private auth: AngularFireAuth) {}
  resolve(): Observable<User> {
    return this.auth.authState.pipe(take(1))
  }
}
