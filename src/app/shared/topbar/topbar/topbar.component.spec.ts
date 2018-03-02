import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { TopbarComponent } from './topbar.component'
import { Deceiver } from 'deceiver-core'
import { AngularFireAuth } from 'angularfire2/auth'

describe('TopbarComponent', () => {
  let component: TopbarComponent
  let fixture: ComponentFixture<TopbarComponent>

  beforeEach(
    async(() => {
      const AngularFireAuthMock = Deceiver(AngularFireAuth)
      TestBed.configureTestingModule({
        declarations: [TopbarComponent],
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
    fixture = TestBed.createComponent(TopbarComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display user e-mail address', () => {
    const html: HTMLElement = fixture.nativeElement
    component.user = {
      displayName: '',
      phoneNumber: '',
      photoURL: '',
      email: 'hello2',
      providerId: 'email',
      uid: '12345',
    }
    fixture.detectChanges()
    expect(html.querySelector('.user-email').textContent).toContain(
      component.user.email,
    )
  })
})
