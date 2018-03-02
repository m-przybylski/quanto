import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SidebarComponent } from './sidebar.component'
import { MenuModule } from 'primeng/menu'
import { RouterTestingModule } from '@angular/router/testing'

describe('SidebarComponent', () => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MenuModule, RouterTestingModule],
        declarations: [SidebarComponent],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
