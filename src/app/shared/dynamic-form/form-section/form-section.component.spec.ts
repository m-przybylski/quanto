import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FormSectionComponent } from './form-section.component'
import { FormBuilder } from '../form-builder.service'
import { ComponentFactoryResolver } from '@angular/core'

describe('FormSectionComponent', () => {
  let component: FormSectionComponent
  let fixture: ComponentFixture<FormSectionComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [FormSectionComponent],
        providers: [FormBuilder, ComponentFactoryResolver],
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
})
