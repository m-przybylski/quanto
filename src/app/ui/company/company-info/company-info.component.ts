import { Component } from '@angular/core'
import {
  FormConfig,
  ControlConfig,
} from '../../../shared/dynamic-form/form-config'
import { Router, ActivatedRoute } from '@angular/router'
import { Validators } from '@angular/forms'
import { Company } from '../../../core/company/company'
import { CompanyService } from '../../../core/company/company.service'

@Component({
  selector: 'qto-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
})
export class CompanyInfoComponent {
  public companyFormConfig: FormConfig[]
  private companyList: Company[]
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService,
  ) {
    this.companyList = this.route.snapshot.data.company
    this.companyFormConfig = [
      {
        header: 'Company',
        formArrayName: 'companyInfo',
        formArrayControls: {
          header: 'Company',
          formControls: this.createCompanyForm(),
        },
        formArrayValues: this.companyList.map(company =>
          this.createCompanyFormValues(company),
        ),
      },
    ]
  }

  saveForm(value: {
    companyInfo: { companyName: string; companyAddress: string }[]
  }) {
    value.companyInfo.map(company => {
      this.companyService.updateCompany({
        name: company.companyName,
        address: company.companyAddress,
      })
    })
    this.router.navigate(['/'])
  }
  private createCompanyForm(): ControlConfig[] {
    return [
      {
        label: 'Company name',
        name: 'companyName',
        type: 'text',
        disabled: true,
        controlValidators: [
          {
            key: 'required',
            message: 'Company name is required',
            validator: Validators.required,
          },
        ],
      },
      {
        label: 'Company address',
        name: 'companyAddress',
        type: 'text',
        controlValidators: [
          {
            key: 'required',
            message: 'User email name is required',
            validator: Validators.required,
          },
        ],
      },
    ]
  }
  private createCompanyFormValues(company: Company) {
    return {
      companyName: company.name,
      companyAddress: company.address,
    }
  }
}
