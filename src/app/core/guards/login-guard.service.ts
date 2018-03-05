import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { AngularFireAuth } from 'angularfire2/auth'
import { map } from 'rxjs/operators'

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(private auth: AngularFireAuth) {}
  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(map(val => !!val))
  }
}
