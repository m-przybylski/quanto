import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { AngularFireAuth } from 'angularfire2/auth'

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(private auth: AngularFireAuth) {}
  canActivate(): Observable<boolean> {
    return this.auth.authState.map(val => !!val)
  }
}
