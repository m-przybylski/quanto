import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FormGroupHeaderComponent } from './form-group-header.component'
import { By } from '@angular/platform-browser'

describe('FormGroupHeaderComponent', () => {
  let component: FormGroupHeaderComponent
  let fixture: ComponentFixture<FormGroupHeaderComponent>
  const header = 'Header'

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
    component.headerCaption = header
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should diplaty title', () => {
    const element = fixture.debugElement
    let h3
    if (By) {
      const h3Header = element.query(By.css('.form-group-header'))
      h3 = h3Header.nativeElement
    } else {
      h3 = element.nativeElement.querySelector('.form-group-header')
    }
    expect(h3.textContent).toContain('Header')
  })
})
