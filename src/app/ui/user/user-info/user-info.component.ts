import { Component } from '@angular/core'
import { UserInfo } from 'firebase'
import { FormConfig } from '../../../shared/dynamic-form/form-config'
import { Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { UserService } from '../../../core/user/user.service'

@Component({
  selector: 'qto-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  public userFormConfig: FormConfig[]
  constructor(private userService: UserService, private router: Router) {
    const user: UserInfo = this.userService.currentUser

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
          {
            label: 'Theme',
            name: 'theme',
            type: 'dropdown',
            controlClass: '',
            controlValidators: [],
            options: [
              { key: '', label: '' },
              { key: 'theme-blue-orange', label: 'Blue' },
              { key: 'theme-pink-indigo', label: 'Pink <3' },
            ],
            optionLabel: 'label',
            value: JSON.parse(user.photoURL),
          },
        ],
      },
    ]
  }

  saveForm(value) {
    this.userService.updateUser(value.theme, value.userName).then(_ => {
      this.router.navigate(['/'])
    })
  }
}
