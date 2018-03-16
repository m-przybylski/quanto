import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormSectionComponent } from './form-section.component'
import { FormBuilder } from '../form-builder.service'
import { FormConfig } from '../form-config'
import { DynamicFormModule } from '../dynamic-form.module'

const formConfig: FormConfig = { header: 'header' }

describe('FormSectionComponent', () => {
  let component: FormSectionComponent
  let fixture: ComponentFixture<FormSectionComponent>
  let formBuilder: jasmine.SpyObj<FormBuilder>

  beforeEach(
    async(() => {
      formBuilder = jasmine.createSpyObj('FormBuilder', ['build'])
      TestBed.configureTestingModule({
        imports: [DynamicFormModule],
        declarations: [],
        providers: [
          {
            provide: FormBuilder,
            useValue: formBuilder,
          },
        ],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSectionComponent)
    component = fixture.componentInstance
    component.formSection = formConfig
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
    expect(formBuilder.build).toHaveBeenCalledTimes(1)
    expect(formBuilder.build.calls.argsFor(0)[0]).toEqual({
      header: 'header',
    })
  })
})
