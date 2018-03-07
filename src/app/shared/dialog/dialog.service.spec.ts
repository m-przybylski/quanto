import { TestBed, inject } from '@angular/core/testing'

import { DialogService } from './dialog.service'
import { Component, NgModule } from '@angular/core'
import { OverlayModule } from '@angular/cdk/overlay'

@Component({ template: '' })
class DummyComponent {}
@NgModule({
  imports: [],
  entryComponents: [DummyComponent],
})
class DialogTestModule {}

describe('DialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule, DialogTestModule],
      providers: [DialogService],
      declarations: [DummyComponent],
    })
  })

  it(
    'should be created',
    inject([DialogService], (service: DialogService) => {
      expect(service).toBeTruthy()
    }),
  )

  it(
    'should create dynamic component',
    inject([DialogService], (service: DialogService) => {
      const something = service.open(DummyComponent)
      expect(something).toBeTruthy()
    }),
  )
})
