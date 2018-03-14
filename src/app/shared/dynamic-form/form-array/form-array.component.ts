import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { FormArray, FormGroup } from '@angular/forms'
import { FormConfig } from '../form-config'

@Component({
  selector: 'qto-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss'],
})
export class FormArrayComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
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
  add() {
    const formGroup = new FormGroup({})
    this.formArray.push(formGroup)
    const exampleConfig = this._formConfig[0]
    exampleConfig.formControls = exampleConfig.formControls.map(control => ({
      ...control,
      value: '',
      disabled: false,
    }))
    this._formConfig.push({ ...exampleConfig, formGroup })
    this.cdr.detectChanges()
  }
}
