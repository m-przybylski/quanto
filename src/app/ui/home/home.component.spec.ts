import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { HomeComponent } from './home.component'
import { ToolbarModule } from 'primeng/toolbar'
import { SharedModule } from '../../shared/shared.module'
import { RouterTestingModule } from '@angular/router/testing'
import { GrowlModule } from 'primeng/growl'
import { SidebarModule } from '../../shared/sidebar/sidebar.module'
import { TopbarModule } from '../../shared/topbar/topbar.module'
import { AngularFireAuth } from 'angularfire2/auth'
import { Deceiver } from 'deceiver-core'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(
    async(() => {
      const AngularFireAuthMock = Deceiver(AngularFireAuth)
      TestBed.configureTestingModule({
        imports: [
          ToolbarModule,
          SharedModule,
          RouterTestingModule,
          GrowlModule,
          SidebarModule,
          TopbarModule,
        ],
        declarations: [HomeComponent],
        providers: [
          {
            provide: AngularFireAuth,
            useValue: AngularFireAuthMock,
          },
        ],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    component.user = component.user = {
      displayName: '',
      phoneNumber: '',
      photoURL: '',
      email: 'hello2',
      providerId: 'email',
      uid: '12345',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
