import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuotePreviewComponent } from './quote-preview.component'
import { ButtonModule } from 'primeng/button'
import {
  DialogService,
  DIALOG_DATA,
} from '../../../shared/dialog/dialog.service'
import { DialogOverlayRef } from '../../../shared/dialog/dialog-overlay-ref'

describe('QuotePreviewComponent', () => {
  let component: QuotePreviewComponent
  let fixture: ComponentFixture<QuotePreviewComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ButtonModule],
        declarations: [QuotePreviewComponent],
        providers: [
          DialogService,
          {
            provide: DialogOverlayRef,
            useValue: new DialogOverlayRef(undefined),
          },
          {
            provide: DIALOG_DATA,
            userValiue: null,
          },
        ],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotePreviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
