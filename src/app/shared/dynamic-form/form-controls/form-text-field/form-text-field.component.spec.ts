import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'

import { FormTextFieldComponent } from './form-text-field.component'
import { ControlConfig } from '../../form-config'

describe('FormTextFieldComponent', () => {
  let component: FormTextFieldComponent
  let fixture: ComponentFixture<FormTextFieldComponent>
  const formControl = new FormControl()
  const controlConfig: ControlConfig = {
    name: 'user',
    type: 'text',
    label: 'user placeholder',
    controlValidators: [
      { key: 'required', message: 'error', validator: Validators.required },
    ],
  }

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule],
        declarations: [FormTextFieldComponent],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextFieldComponent)
    component = fixture.componentInstance
    component.formGroup = new FormGroup(
      Object.assign({}, { [controlConfig.name]: formControl }),
    )
    component.formControl = formControl
    component.control = controlConfig
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should create template', () => {
    const formTextInput: HTMLElement = fixture.nativeElement
    expect(formTextInput.querySelector('label').textContent).toContain(
      controlConfig.label,
    )
  })

  it('should not display error', () => {
    fixture.detectChanges()
    const formTextInput: HTMLElement = fixture.nativeElement
    expect(formControl.errors).toBeFalsy()
    expect(formTextInput.querySelectorAll('.ui-input-error').length).toBe(0)
  })

  it('should display error', () => {
    formControl.setErrors({ required: true })
    fixture.detectChanges()
    const formTextInput: HTMLElement = fixture.nativeElement
    expect(formControl.errors).toBeTruthy()
    expect(
      formTextInput.querySelectorAll('.ui-input-error').length,
    ).toBeGreaterThan(0)
    expect(
      formTextInput.querySelector('.ui-input-error > div').textContent,
    ).toContain('error')
  })
})
