import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CompanyInfoComponent } from './company-info/company-info.component'
import { CompanyResolverService } from '../../core/resolvers/company-resolver.service'

const routes: Routes = [
  {
    path: '',
    component: CompanyInfoComponent,
    resolve: { company: CompanyResolverService },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
