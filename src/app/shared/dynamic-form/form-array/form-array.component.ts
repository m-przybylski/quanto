import { Component, OnInit } from '@angular/core'
import { FormArray, FormGroup } from '@angular/forms'
import { FormConfig } from '../form-config'

@Component({
  selector: 'qto-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss'],
})
export class FormArrayComponent implements OnInit {
  constructor() {}
  public formArray: FormArray
  public formConfig: FormConfig
  public _formConfig: FormConfig[] = []
  ngOnInit(): void {
    this.formConfig.formArrayControls.forEach(item => {
      const formGroup = new FormGroup({})
      this.formArray.push(formGroup)
      this._formConfig.push({ ...item, formGroup })
    })
  }
}
