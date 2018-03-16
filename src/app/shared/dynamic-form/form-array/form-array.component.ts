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
    /**
     * during initialization of array value is stored separetply
     * there is a need to iterate over each control and map value
     * from this.formConfig.formArrayValues to formControls array
     */
    this.formConfig.formArrayValues.forEach(item => {
      const formGroup = new FormGroup({})
      this.formArray.push(formGroup)
      const formControls = this.formConfig.formArrayControls.formControls.map(
        formControl => {
          const result = { ...formControl }
          if (item.hasOwnProperty(result.name)) {
            result.value = item[result.name]
          } else {
            result.value = ''
          }
          return result
        },
      )
      /**
       * OK, now to be able to nest arrays there is a need to
       * copy FormConfig from array and assign new formControls with populated values
       */
      this._formConfig.push({
        ...this.formConfig.formArrayControls,
        formGroup,
        formControls,
      })
    })
  }
  add() {
    const formGroup = new FormGroup({})
    this.formArray.push(formGroup)
    const exampleConfig = this.formConfig.formArrayControls
    exampleConfig.formControls = exampleConfig.formControls.map(control => ({
      ...control,
      value: '',
      disabled: false,
    }))
    this._formConfig.push({ ...exampleConfig, formGroup })
    this.cdr.detectChanges()
  }
}
