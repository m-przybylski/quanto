import { Injectable } from '@angular/core'
import { CompanyService } from '../company/company.service'
import { Resolve } from '@angular/router'
import { Company } from '../company/company'
import { take } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable()
export class CompanyResolverService implements Resolve<Company[]> {
  constructor(private companyService: CompanyService) {}
  resolve(): Observable<Company[]> {
    return this.companyService.getCompanyObject().pipe(take(1))
  }
}
