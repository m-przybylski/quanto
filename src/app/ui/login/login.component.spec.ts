import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginComponent } from './login.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { Deceiver } from 'deceiver-core'
import { AngularFireAuth } from 'angularfire2/auth'
import { RouterTestingModule } from '@angular/router/testing'
// import { AngularFireDatabase } from 'angularfire2/database'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(
    async(() => {
      // const AngularFirestoreMock = Deceiver(AngularFireDatabase)
      const AngularFireAuthMock = Deceiver(AngularFireAuth)

      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, ButtonModule, RouterTestingModule],
        providers: [
          { provide: AngularFireAuth, useValue: AngularFireAuthMock },
        ],
        declarations: [LoginComponent],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
