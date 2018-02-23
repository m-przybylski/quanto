import { Component } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import { Router } from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'qto-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    })
  }
  public login() {
    this.afAuth.auth
      .signInAndRetrieveDataWithEmailAndPassword(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value,
      )
      .then(a => {
        console.log(a)
        this.router.navigate(['/home'])
      })
  }
}
