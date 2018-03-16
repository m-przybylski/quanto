import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FormDropdownComponent } from './form-dropdown.component'
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms'
import { PrimeTestingModule } from '../../../test/prime-mock.module'
import { ControlConfig } from '../../form-config'

describe('FormDropdownComponent', () => {
  let component: FormDropdownComponent
  let fixture: ComponentFixture<FormDropdownComponent>
  let formControl: FormControl
  const controlConfig: ControlConfig = {
    name: 'user',
    type: 'dropdown',
    label: 'user placeholder',
    controlValidators: [
      { key: 'required', message: 'error', validator: Validators.required },
    ],
  }

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, PrimeTestingModule],
        declarations: [FormDropdownComponent],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    formControl = new FormControl()
    fixture = TestBed.createComponent(FormDropdownComponent)
    component = fixture.componentInstance
    component.formControl = formControl
    component.formGroup = new FormGroup(
      Object.assign({}, { [controlConfig.name]: formControl }),
    )
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
    const formTextInput: HTMLElement = fixture.nativeElement
    expect(component.formControl.errors).toBeFalsy()
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
