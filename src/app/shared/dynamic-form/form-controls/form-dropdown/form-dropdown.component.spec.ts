import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FormDropdownComponent } from './form-dropdown.component'
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'

describe('FormDropdownComponent', () => {
  let component: FormDropdownComponent
  let fixture: ComponentFixture<FormDropdownComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, DropdownModule],
        declarations: [FormDropdownComponent],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDropdownComponent)
    component = fixture.componentInstance
    component.formControl = new FormControl()
    component.formGroup = new FormGroup({
      control: component.formControl,
    })
    component.control = {
      name: 'control',
      type: 'dropdown',
      label: '',
    }
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
