import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ControlConfig } from '../control-config'

@Component({
  selector: 'qto-form-text-field',
  templateUrl: './form-text-field.component.html',
  styleUrls: ['./form-text-field.component.scss'],
})
export class FormTextFieldComponent {
  constructor() {}

  public formGroup: FormGroup
  public formControl: FormControl
  public control: ControlConfig
}
