import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CompanyInfoComponent } from './company-info.component'
import { DynamicFormModule } from '../../../shared/dynamic-form/dynamic-form.module'
import { RouterTestingModule } from '@angular/router/testing'
import { CompanyService } from '../../../core/company/company.service'
import { AngularFireDatabase } from 'angularfire2/database'
import {
  AngularFirestoreMock,
  AngularFireAuthMock,
} from '../../../core/common.test'
import { AngularFireAuth } from 'angularfire2/auth'
import { ActivatedRoute } from '@angular/router'

describe('CompanyInfoComponent', () => {
  let component: CompanyInfoComponent
  let fixture: ComponentFixture<CompanyInfoComponent>
  const routeSpy = {
    snapshot: {
      data: {
        company: [],
      },
    },
  }
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [DynamicFormModule, RouterTestingModule],
        declarations: [CompanyInfoComponent],
        providers: [
          CompanyService,
          { provide: AngularFireDatabase, useFactory: AngularFirestoreMock },
          { provide: AngularFireAuth, useFactory: AngularFireAuthMock },
          { provide: ActivatedRoute, useValue: routeSpy },
        ],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInfoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
