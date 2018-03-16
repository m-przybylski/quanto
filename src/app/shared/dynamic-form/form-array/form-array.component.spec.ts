import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FormArrayComponent } from './form-array.component'
import { ReactiveFormsModule, FormGroup, FormArray } from '@angular/forms'
import { Component, Input } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { ControlConfig } from '../form-config'

@Component({
  selector: 'qto-form-section',
  template: '',
})
class SectionMockComponent {
  @Input() formSection
}

const formControlConfig: ControlConfig[] = [
  {
    name: 'user',
    type: 'text',
    label: 'user name',
  },
  {
    name: 'desc',
    type: 'text',
    label: 'user description',
  },
]

const formControlConfigWiped: ControlConfig[] = [
  {
    name: 'user',
    type: 'text',
    label: 'user name',
    value: '',
    disabled: false,
  },
  {
    name: 'desc',
    type: 'text',
    label: 'user description',
    value: '',
    disabled: false,
  },
]

const formArrayValues = [
  { user: 'janusz', desc: 'janusz desc' },
  { user: 'nowy janusz', desc: 'nowy janusz desc' },
  { user: 'nowy janusz' },
]

describe('FormArrayComponent', () => {
  let component: FormArrayComponent
  let fixture: ComponentFixture<FormArrayComponent>
  let formArray: FormArray

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, ButtonModule],
        declarations: [FormArrayComponent, SectionMockComponent],
      }).compileComponents()
    }),
  )

  describe('with empty entry values', () => {
    beforeEach(() => {
      formArray = new FormArray([])
      fixture = TestBed.createComponent(FormArrayComponent)
      component = fixture.componentInstance
      component.formConfig = {
        header: 'Header',
        formArrayControls: { header: '', formControls: formControlConfig },
        formArrayValues: [],
        formArrayName: 'formArray',
        formGroup: new FormGroup({
          formArray,
        }),
      }
      component.formArray = formArray
      fixture.detectChanges()
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('should add empty element to form array', () => {
      const orgLen = component.formArray.length
      component.add()
      expect(component.formArray.length).toBeGreaterThan(orgLen)
      expect(component.formArray.length).toEqual(component._formConfig.length)
      expect(component._formConfig[orgLen].formControls).toEqual(
        formControlConfigWiped,
      )
    })
  })
  describe('with not entry values', () => {
    beforeEach(() => {
      formArray = new FormArray([])
      fixture = TestBed.createComponent(FormArrayComponent)
      component = fixture.componentInstance
      component.formConfig = {
        header: 'Header',
        formArrayControls: { header: '', formControls: formControlConfig },
        formArrayValues,
        formArrayName: 'formArray',
        formGroup: new FormGroup({
          formArray,
        }),
      }
      component.formArray = formArray
      fixture.detectChanges()
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })
    it('should have array with specific values', () => {
      expect(component.formArray.length).toBe(
        3,
        'length of array should be equal to ',
      )
      expect(component.formArray.length).toEqual(component._formConfig.length)
      expect(component._formConfig[0].formControls.length).toBe(2)
      component._formConfig.forEach((config, index) => {
        config.formControls.forEach(control => {
          if (formArrayValues[index].hasOwnProperty(control.name)) {
            expect(control.value).toBe(
              formArrayValues[index][control.name],
              `controlName: ${control.name} in row ${index}`,
            )
          } else {
            expect(control.value).toBe(
              '',
              `empty controlName: ${control.name} in row ${index}`,
            )
          }
        })
      })
    })
    it('should add empty element to form array', () => {
      const orgLen = component.formArray.length
      component.add()
      expect(component.formArray.length).toBeGreaterThan(orgLen)
      expect(component.formArray.length).toEqual(component._formConfig.length)
      expect(component._formConfig[orgLen].formControls).toEqual(
        formControlConfigWiped,
      )
    })
  })
})
