import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { HomeComponent } from './home.component'
import { ToolbarModule } from 'primeng/toolbar'
import { SharedModule } from '../../shared/shared.module'
import { MenuModule } from 'primeng/menu'
import { RouterTestingModule } from '@angular/router/testing'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ToolbarModule, SharedModule, RouterTestingModule],
        declarations: [HomeComponent],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
