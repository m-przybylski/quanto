import { NgModule } from '@angular/core'
import { FormComponent } from './form/form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { FormSectionComponent } from './form-section/form-section.component'
import { FormTextFieldComponent } from './form-controls/form-text-field/form-text-field.component'
import { FormDropdownComponent } from './form-controls/form-dropdown/form-dropdown.component'
import { FormGroupHeaderComponent } from './form-controls/form-group-header/form-group-header.component'

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  exports: [FormComponent],
  declarations: [
    FormTextFieldComponent,
    FormDropdownComponent,
    FormComponent,
    FormGroupHeaderComponent,
    FormSectionComponent,
  ],
  entryComponents: [
    FormGroupHeaderComponent,
    FormTextFieldComponent,
    FormDropdownComponent,
  ],
})
export class DynamicFormModule {}
