import { Component, Self } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { NgClass } from '@angular/common'

import { CommonControl } from '../common-control'
import { ControlConfig } from '../../form-config'

@Component({
  selector: 'qto-form-dropdown',
  templateUrl: './form-dropdown.component.html',
  styleUrls: ['./form-dropdown.component.scss'],
  providers: [NgClass],
})
export class FormDropdownComponent extends CommonControl {
  public formGroup: FormGroup
  public formControl: FormControl
  public control: ControlConfig

  constructor(@Self() ngClass: NgClass) {
    super(ngClass)
  }
}
