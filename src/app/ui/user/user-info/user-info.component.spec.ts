import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserInfoComponent } from './user-info.component'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireAuthMock } from '../../../core/common.test'
import { DynamicFormModule } from '../../../shared/dynamic-form/dynamic-form.module'
import { UserService } from '../../../core/user/user.service'
import { RouterTestingModule } from '@angular/router/testing'
import { Router } from '@angular/router'

describe('UserInfoComponent', () => {
  let component: UserInfoComponent
  let fixture: ComponentFixture<UserInfoComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [DynamicFormModule, RouterTestingModule],
        declarations: [UserInfoComponent],
        providers: [
          {
            provide: UserService,
            useValue: {
              updateUser: jasmine
                .createSpy()
                .and.returnValue(Promise.resolve()),
              currentUser: { displayName: 'someOne', photoURL: '{}' },
            },
          },
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

  it('should call save user prefs and navigate back', () => {
    const router = fixture.debugElement.injector.get(Router)
    const userService = fixture.debugElement.injector.get(UserService)
    const navigateSpy = spyOn(router, 'navigate')
    component.saveForm({ theme: 'theme', userName: 'Julian' })
    expect(userService.updateUser).toHaveBeenCalledWith('theme', 'Julian')
    setTimeout(() => {
      expect(navigateSpy).toHaveBeenCalledWith(['/'])
    }, 0)
  })
})
