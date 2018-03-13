import {
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ChangeDetectionStrategy,
} from '@angular/core'
import { FormConfig } from '../form-config'
import { FormControl } from '@angular/forms'
import { CommonControl } from '../form-controls/common-control'
import { FormGroupHeaderComponent } from '../form-controls/form-group-header/form-group-header.component'
import { FormTextFieldComponent } from '../form-controls/form-text-field/form-text-field.component'
import { FormDropdownComponent } from '../form-controls/form-dropdown/form-dropdown.component'

@Component({
  selector: 'qto-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSectionComponent {
  @Input()
  set formSection(value: FormConfig) {
    this.build(value)
  }

  @ViewChild('entry', { read: ViewContainerRef })
  private entry: ViewContainerRef
  @ViewChild('header', { read: ViewContainerRef })
  private header: ViewContainerRef

  constructor(private cfr: ComponentFactoryResolver) {}
  private build(form: FormConfig) {
    this.entry.clear()
    const headerFactory = this.cfr.resolveComponentFactory(
      FormGroupHeaderComponent,
    )
    const textInputFactory = this.cfr.resolveComponentFactory(
      FormTextFieldComponent,
    )
    const dropdownFactory = this.cfr.resolveComponentFactory(
      FormDropdownComponent,
    )
    const headerControl = this.header.createComponent(headerFactory)
    headerControl.instance.headerCaption = form.header
    form.formControls.forEach(control => {
      let component: ComponentRef<CommonControl>
      const formControl = new FormControl(control.value || '', {
        validators: control.controlValidators.map(
          validator => validator.validator,
        ),
      })
      form.formGroup.addControl(control.name, formControl)
      switch (control.type) {
        case 'dropdown':
          component = this.entry.createComponent(dropdownFactory)
          break
        default:
          component = this.entry.createComponent(textInputFactory)
      }
      component.instance.control = control
      component.instance.formGroup = form.formGroup
      component.instance.formControl = formControl
      component.changeDetectorRef.detectChanges()
    })
  }
}
