import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FormArrayComponent } from './form-array.component'
import { ReactiveFormsModule, FormGroup, FormArray } from '@angular/forms'
import { Component, Input } from '@angular/core'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'qto-form-section',
  template: '',
})
class SectionMockComponent {
  @Input() formSection
}

describe('FormArrayComponent', () => {
  let component: FormArrayComponent
  let fixture: ComponentFixture<FormArrayComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, ButtonModule],
        declarations: [FormArrayComponent, SectionMockComponent],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArrayComponent)
    component = fixture.componentInstance
    component.formConfig = {
      header: 'Header',
      formArrayControls: [],
      formArrayName: 'formArray',
      formGroup: new FormGroup({
        formArray: new FormArray([]),
      }),
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
