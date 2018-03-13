import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FormGroupHeaderComponent } from './form-group-header.component'

describe('FormGroupHeaderComponent', () => {
  let component: FormGroupHeaderComponent
  let fixture: ComponentFixture<FormGroupHeaderComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [FormGroupHeaderComponent],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
