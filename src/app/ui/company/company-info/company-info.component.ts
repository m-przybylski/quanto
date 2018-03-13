import { Component } from '@angular/core'
import {
  FormConfig,
  ControlConfig,
} from '../../../shared/dynamic-form/form-config'
import { Router, ActivatedRoute } from '@angular/router'
import { Validators } from '@angular/forms'
import { Company } from '../../../core/company/company'

@Component({
  selector: 'qto-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
})
export class CompanyInfoComponent {
  public companyFormConfig: FormConfig[]
  private companyList: Company[]
  constructor(private router: Router, private route: ActivatedRoute) {
    this.companyList = this.route.snapshot.data.company
    this.companyFormConfig = [
      {
        header: 'Company',
        formArrayName: 'companyInfo',
        formArrayControls: this.companyList.map(company => ({
          header: 'Company',
          formControls: this.createCompanyForm(company),
        })),
      },
    ]
  }

  saveForm(value) {
    console.log(value)
    this.router.navigate(['/'])
  }
  private createCompanyForm(company: Company): ControlConfig[] {
    return [
      {
        label: 'Company name',
        name: 'companyName',
        type: 'text',
        controlValidators: [
          {
            key: 'required',
            message: 'Company name is required',
            validator: Validators.required,
          },
        ],
        value: company.name,
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
        value: company.address,
      },
    ]
  }
}
