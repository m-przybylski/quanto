import { Component } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'qto-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup
  public message: string
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }
  public login() {
    this.afAuth.auth
      .signInWithEmailAndPassword(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value,
      )
      .then(() => {
        this.router.navigate(['/'])
      })
      .catch(err => {
        this.message = err
      })
  }
}
