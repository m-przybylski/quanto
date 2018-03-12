import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FormDropdownComponent } from './form-dropdown.component'

describe('FormDropdownComponent', () => {
  let component: FormDropdownComponent
  let fixture: ComponentFixture<FormDropdownComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [FormDropdownComponent],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDropdownComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
