import { Injectable } from '@angular/core'
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database'

@Injectable()
export class CompanyService {
  private companyList: AngularFireList<any>
  constructor(private database: AngularFireDatabase) {
    this.companyList = this.database.list('company')
  }

  public getCompanyList() {
    return this.companyList.valueChanges()
  }
}
