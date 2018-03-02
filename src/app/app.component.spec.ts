import { async, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { AppComponent } from './app.component'
import { ProgressBarModule } from 'primeng/progressbar'
describe('AppComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, ProgressBarModule],
        declarations: [AppComponent],
      }).compileComponents()
    }),
  )
  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent)
      const app: AppComponent = fixture.debugElement.componentInstance
      expect(app).toBeTruthy()
    }),
  )
})
