import { ComponentFixture, async, TestBed } from '@angular/core/testing'
import { FormSectionComponent } from './form-section/form-section.component'
import { FormBuilder } from './form-builder.service'
import { FormConfig, ControlConfig } from './form-config'
import { DynamicFormModule } from './dynamic-form.module'

import { FormGroup } from '@angular/forms'

const formConfig: FormConfig = {
  header: 'header',
  formGroup: new FormGroup({}), // this is required for build to work
}

const formControlConfig: ControlConfig[] = [
  {
    name: 'user',
    type: 'text',
    label: 'user name',
    value: 'janusz',
  },
  {
    name: 'desc',
    type: 'text',
    label: 'user description',
  },
]

describe('FormSectionComponent', () => {
  let component: FormSectionComponent
  let fixture: ComponentFixture<FormSectionComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [DynamicFormModule],
        declarations: [],
        providers: [FormBuilder],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should create and build form', () => {
    expect(component).toBeTruthy()
    const build /*?*/ = spyOn(
      TestBed.get(FormBuilder),
      'build',
    ).and.callThrough()
    formConfig.formControls = formControlConfig
    component.formSection = formConfig
    expect(build).toHaveBeenCalledTimes(1)
    expect(formConfig.formGroup.controls.hasOwnProperty('user')).toBeTruthy()
    expect(formConfig.formGroup.controls.hasOwnProperty('desc')).toBeTruthy()
    expect(formConfig.formGroup.controls['user'].value).toEqual('janusz')
  })
})
