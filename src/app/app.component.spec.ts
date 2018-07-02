import { async, TestBed, ComponentFixture } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { AppComponent } from './app.component'
import { UserService } from './core/user/user.service'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireAuthMock } from './core/common.test'
import {
  Router,
  RouterEvent,
  NavigationStart,
  NavigationEnd,
  GuardsCheckEnd,
} from '@angular/router'
import { Subject } from 'rxjs'
import { Deceiver } from 'deceiver-core'
import { Component } from '@angular/core'
// tslint:disable-next-line:component-selector
@Component({ template: '', selector: 'p-progressBar' })
class ProgressBarComponent {}

describe('AppComponent', () => {
  let app: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let routerMock: Router
  const events$: Subject<RouterEvent> = new Subject()
  beforeEach(async(() => {
    routerMock = Deceiver(Router, {
      navigate: jasmine.createSpy('navigate').and.stub(),
      events: events$.asObservable(),
    })
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, ProgressBarComponent],
      providers: [
        UserService,
        {
          provide: AngularFireAuth,
          useFactory: AngularFireAuthMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    app = fixture.debugElement.componentInstance
  })

  it('should create the app', () => {
    expect(app).toBeTruthy()
  })
  it('should display loading bar on start navigation', () => {
    expect(app.loading).toBeFalsy()
    expect(
      fixture.debugElement.nativeElement.querySelector('p-progressBar'),
    ).toBeFalsy()
    events$.next(new NavigationStart(0, 'foo'))
    fixture.detectChanges()
    expect(app.loading).toBeTruthy()
    expect(
      expect(
        fixture.debugElement.nativeElement.querySelector('p-progressBar'),
      ).toBeTruthy(),
    )
  })
  it('should hide loading bar on end navigation', () => {
    events$.next(new NavigationStart(0, 'foo'))
    fixture.detectChanges()
    expect(app.loading).toBeTruthy()
    expect(
      expect(
        fixture.debugElement.nativeElement.querySelector('p-progressBar'),
      ).toBeTruthy(),
    )
    events$.next(new NavigationEnd(0, 'foo', 'bar'))
    fixture.detectChanges()
    expect(
      fixture.debugElement.nativeElement.querySelector('p-progressBar'),
    ).toBeFalsy()
    expect(app.loading).toBeFalsy()
  })
  it('should redirect to login page when guard returns false', () => {
    events$.next(new GuardsCheckEnd(0, 'foo', 'bar', null, false))
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login'])
  })
  it('should not redirect to login page when guard returns true', () => {
    events$.next(new GuardsCheckEnd(0, 'foo', 'bar', null, true))
    expect(routerMock.navigate).not.toHaveBeenCalled()
  })
})
