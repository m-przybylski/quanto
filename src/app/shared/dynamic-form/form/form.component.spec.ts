import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FormComponent } from './form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { Component, Input } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing'

@Component({
  selector: 'qto-form-section',
  template: '',
})
class SectionMockComponent {
  @Input() formSection
}

@Component({ template: '' })
class FormGroupHeaderComponent {}

describe('FormComponent', () => {
  let component: FormComponent
  let fixture: ComponentFixture<FormComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, ButtonModule],
        declarations: [
          FormComponent,
          SectionMockComponent,
          FormGroupHeaderComponent,
        ],
      })
        .overrideModule(BrowserDynamicTestingModule, {
          set: {
            entryComponents: [FormGroupHeaderComponent],
          },
        })
        .compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent)
    component = fixture.componentInstance
    component.formConfig = []
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit value when saved', done => {
    component.save.subscribe(_ => {
      expect(_).toBeTruthy()
      done()
    })
    component.saveForm()
  })

  it('should reset form', () => {
    const form = component._formConfig
    component.resetForm()
    expect(component._formConfig).not.toEqual(form)
  })
})
