import { NgModule, Input, forwardRef } from '@angular/core'

import { Component } from '@angular/core'
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms'

class ControlValueAccessorMock implements ControlValueAccessor {
  writeValue(_obj: any): void {}
  registerOnChange(_fn: any): void {}
  registerOnTouched(_fn: any): void {}
  setDisabledState?(_isDisabled: boolean): void {}
}

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
export class EditorMockComponent extends ControlValueAccessorMock {}

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
export class DropdownMockComponent extends ControlValueAccessorMock {
  @Input() autoWidth
  @Input() options
  @Input() optionLabel
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'p-button',
  template: '',
})
export class ButtonMockComponent {
  @Input() disabled
  @Input() label
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'p-calendar',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CalendarMockComponent),
    },
  ],
})
export class CalendarMockComponent extends ControlValueAccessorMock {
  @Input() disabled
}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'p-autoComplete',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AutoCompleteMockComponent),
    },
  ],
})
export class AutoCompleteMockComponent extends ControlValueAccessorMock {
  @Input() suggestions
}

@NgModule({
  declarations: [
    EditorMockComponent,
    DropdownMockComponent,
    ButtonMockComponent,
    CalendarMockComponent,
    AutoCompleteMockComponent,
  ],
  imports: [ReactiveFormsModule],
  exports: [
    EditorMockComponent,
    DropdownMockComponent,
    ButtonMockComponent,
    CalendarMockComponent,
    AutoCompleteMockComponent,
  ],
})
export class PrimeTestingModule {}
