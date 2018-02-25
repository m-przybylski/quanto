import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SidebarComponent } from './sidebar.component'
import { MenuModule } from 'primeng/menu'

describe('SidebarComponent', () => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MenuModule],
        declarations: [SidebarComponent],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  xit('should create', () => {
    expect(component).toBeTruthy()
  })
})
