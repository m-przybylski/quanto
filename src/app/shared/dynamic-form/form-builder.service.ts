import {
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core'
import { FormConfig } from './form-config'
import { FormGroupHeaderComponent } from './form-controls/form-group-header/form-group-header.component'
import { FormTextFieldComponent } from './form-controls/form-text-field/form-text-field.component'
import { FormDropdownComponent } from './form-controls/form-dropdown/form-dropdown.component'
import { FormArrayComponent } from './form-array/form-array.component'
import { CommonControl } from './form-controls/common-control'
import { FormControl, FormArray } from '@angular/forms'

export class FormBuilder {
  constructor(private cfr: ComponentFactoryResolver) {}
  public build(
    form: FormConfig,
    entry: ViewContainerRef,
    entryArray: ViewContainerRef,
    header: ViewContainerRef,
  ) {
    entry.clear()
    const headerFactory = this.cfr.resolveComponentFactory(
      FormGroupHeaderComponent,
    )
    const textInputFactory = this.cfr.resolveComponentFactory(
      FormTextFieldComponent,
    )
    const dropdownFactory = this.cfr.resolveComponentFactory(
      FormDropdownComponent,
    )
    const formArrayFactory = this.cfr.resolveComponentFactory(
      FormArrayComponent,
    )
    const headerControl = header.createComponent(headerFactory)
    headerControl.instance.headerCaption = form.header
    if (form.formControls) {
      form.formControls.forEach(control => {
        let component: ComponentRef<CommonControl>
        const formControl = new FormControl(
          { value: control.value || '', disabled: control.disabled },
          {
            validators: control.controlValidators.map(
              validator => validator.validator,
            ),
          },
        )
        form.formGroup.addControl(control.name, formControl)
        switch (control.type) {
          case 'dropdown':
            component = entry.createComponent(dropdownFactory)
            break
          default:
            component = entry.createComponent(textInputFactory)
        }
        component.instance.control = control
        component.instance.formGroup = form.formGroup
        component.instance.formControl = formControl
      })
    }

    if (form.formArrayControls) {
      const formArray = new FormArray([])
      form.formGroup.addControl(form.formArrayName, formArray)
      const component = entryArray.createComponent(formArrayFactory)
      component.instance.formArray = formArray
      component.instance.formConfig = form
    }
  }
}
