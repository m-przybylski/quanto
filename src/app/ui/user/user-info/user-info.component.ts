import { Component } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import { UserInfo } from 'firebase'
import { FormConfig } from '../../../shared/dynamic-form/form-config'
import { Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'qto-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  public userFormConfig: FormConfig[]
  constructor(private auth: AngularFireAuth, private router: Router) {
    const user: UserInfo = this.auth.auth.currentUser

    this.userFormConfig = [
      {
        header: 'User Info',
        formControls: [
          {
            label: 'User Display Name',
            name: 'userName',
            type: 'text',
            controlClass: 'user-add-prop',
            controlValidators: [
              {
                key: 'required',
                message: 'User display name is required',
                validator: Validators.required,
              },
            ],
            value: user.displayName,
          },
          {
            label: 'User email',
            name: 'userEmail',
            type: 'text',
            disabled: true,
            controlClass: 'user-add-prop',
            controlValidators: [
              {
                key: 'required',
                message: 'User email name is required',
                validator: Validators.required,
              },
            ],
            value: user.email,
          },
        ],
      },
    ]
  }

  saveForm(value) {
    this.auth.auth.currentUser
      .updateProfile({
        displayName: value.userName,
        photoURL: null,
      })
      .then(_ => {
        this.router.navigate(['/'])
      })
  }
}
