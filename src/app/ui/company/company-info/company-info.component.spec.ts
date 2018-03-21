import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CompanyInfoComponent } from './company-info.component'
import { DynamicFormModule } from '../../../shared/dynamic-form/dynamic-form.module'
import { CompanyService } from '../../../core/company/company.service'
import { AngularFireDatabase } from 'angularfire2/database'
import {
  AngularFirestoreMock,
  AngularFireAuthMock,
} from '../../../core/common.test'
import { AngularFireAuth } from 'angularfire2/auth'
import { ActivatedRoute, Router } from '@angular/router'
import { Deceiver } from 'deceiver-core'
import { Company } from '../../../core/company/company'

const companyData: Company[] = [
  {
    name: 'company 1',
    address: 'company 1 address',
  },
]

const companyFormData = {
  companyInfo: [
    {
      companyName: 'company 1',
      companyAddress: 'company 1 address',
    },
  ],
}

describe('CompanyInfoComponent', () => {
  let component: CompanyInfoComponent
  let fixture: ComponentFixture<CompanyInfoComponent>
  let companyService: CompanyService
  const routeSpy = {
    snapshot: {
      data: {
        company: companyData,
      },
    },
  }
  let router: Router
  beforeEach(
    async(() => {
      companyService = Deceiver(CompanyService, {
        updateCompany: jasmine
          .createSpy('updateCompany')
          .and.returnValue(Promise.resolve()),
      })
      router = Deceiver(Router, {
        navigate: jasmine.createSpy('navigate').and.stub(),
      })
      TestBed.configureTestingModule({
        imports: [DynamicFormModule],
        declarations: [CompanyInfoComponent],
        providers: [
          { provide: CompanyService, useValue: companyService },
          { provide: AngularFireDatabase, useFactory: AngularFirestoreMock },
          { provide: AngularFireAuth, useFactory: AngularFireAuthMock },
          { provide: ActivatedRoute, useValue: routeSpy },
          { provide: Router, useValue: router },
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
  it('should call service when we save company', done => {
    component.saveForm(companyFormData)
    expect(companyService.updateCompany).toHaveBeenCalledWith(companyData[0])
    setTimeout(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/'])
      done()
    }, 0)
  })
})
