import { NgModule, Input, forwardRef } from '@angular/core'

import { Component } from '@angular/core'
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms'

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'p-editor',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => EditorMockComponent),
    },
  ],
})
export class EditorMockComponent implements ControlValueAccessor {
  writeValue(_obj: any): void {}
  registerOnChange(_fn: any): void {}
  registerOnTouched(_fn: any): void {}
  setDisabledState?(_isDisabled: boolean): void {}
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'p-dropdown',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DropdownMockComponent),
    },
  ],
})
export class DropdownMockComponent implements ControlValueAccessor {
  @Input() autoWidth
  @Input() options
  @Input() optionLabel
  writeValue(_obj: any): void {}
  registerOnChange(_fn: any): void {}
  registerOnTouched(_fn: any): void {}
  setDisabledState?(_isDisabled: boolean): void {}
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'p-button',
  template: '',
})
export class ButtonMockComponent {
  @Input() disabled
}

@NgModule({
  declarations: [
    EditorMockComponent,
    DropdownMockComponent,
    ButtonMockComponent,
  ],
  imports: [ReactiveFormsModule],
  exports: [EditorMockComponent, DropdownMockComponent, ButtonMockComponent],
})
export class PrimeTestingModule {}
