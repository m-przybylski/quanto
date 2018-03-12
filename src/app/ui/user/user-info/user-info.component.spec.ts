import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserInfoComponent } from './user-info.component'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireAuthMock } from '../../../core/common.test'

describe('UserInfoComponent', () => {
  let component: UserInfoComponent
  let fixture: ComponentFixture<UserInfoComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [UserInfoComponent],
        providers: [
          { provide: AngularFireAuth, useFactory: AngularFireAuthMock },
        ],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
