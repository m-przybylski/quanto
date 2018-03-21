import { Injectable } from '@angular/core'
import {
  AngularFireList,
  AngularFireDatabase,
  AngularFireObject,
} from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'
import { Company } from './company'
import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators'

@Injectable()
export class CompanyService {
  private companyList: AngularFireList<Company>
  private companyObject: AngularFireObject<CompanyDatabase>
  constructor(private database: AngularFireDatabase, auth: AngularFireAuth) {
    this.companyList = this.database.list(
      `${auth.auth.currentUser.uid}/company`,
    )
    this.companyObject = this.database.object(
      `${auth.auth.currentUser.uid}/company`,
    )
  }

  public getCompanyObject(): Observable<Company[]> {
    return this.companyObject.valueChanges().pipe(
      map(item => {
        const list: Company[] = []
        for (const prop in item) {
          if (item.hasOwnProperty(prop)) {
            list.push(item[prop])
          }
        }
        return list
      }),
    )
  }

  public updateCompany(company: Company): Promise<void> {
    return this.companyList.set(company.name, company)
  }
}

interface CompanyDatabase {
  [key: string]: { name: string; address: string }
}
