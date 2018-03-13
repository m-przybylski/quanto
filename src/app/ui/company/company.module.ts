import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CompanyRoutingModule } from './company-routing.module'
import { CompanyInfoComponent } from './company-info/company-info.component'
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module'

@NgModule({
  imports: [CommonModule, CompanyRoutingModule, DynamicFormModule],
  declarations: [CompanyInfoComponent],
})
export class CompanyModule {}
