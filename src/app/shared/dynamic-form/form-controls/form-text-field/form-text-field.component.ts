import { Component, Self } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { NgClass } from '@angular/common'

import { CommonControl } from '../common-control'
import { ControlConfig } from '../../form-config'

@Component({
  selector: 'qto-form-text-field',
  templateUrl: './form-text-field.component.html',
  styleUrls: ['./form-text-field.component.scss'],
  providers: [NgClass],
})
export class FormTextFieldComponent extends CommonControl {
  public formGroup: FormGroup
  public formControl: FormControl
  public control: ControlConfig

  constructor(@Self() ngClass: NgClass) {
    super(ngClass)
  }
}
