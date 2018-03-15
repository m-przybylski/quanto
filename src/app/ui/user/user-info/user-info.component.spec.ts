import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserInfoComponent } from './user-info.component'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireAuthMock } from '../../../core/common.test'
import { DynamicFormModule } from '../../../shared/dynamic-form/dynamic-form.module'
import { UserService } from '../../../core/user/user.service'
import { RouterTestingModule } from '@angular/router/testing'

describe('UserInfoComponent', () => {
  let component: UserInfoComponent
  let fixture: ComponentFixture<UserInfoComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [DynamicFormModule, RouterTestingModule],
        declarations: [UserInfoComponent],
        providers: [
          UserService,
          { provide: AngularFireAuth, useFactory: AngularFireAuthMock },
        ],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
