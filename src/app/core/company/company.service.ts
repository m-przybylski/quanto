import { Injectable } from '@angular/core'
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'
import { Company } from './company'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class CompanyService {
  private companyList: AngularFireList<Company>
  constructor(private database: AngularFireDatabase, auth: AngularFireAuth) {
    this.companyList = this.database.list(
      `${auth.auth.currentUser.uid}/company`,
    )
  }

  public getCompanyList(): Observable<Company[]> {
    return this.companyList.valueChanges()
  }
}
