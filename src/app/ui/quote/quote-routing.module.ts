import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { QuoteListComponent } from './quote-list/quote-list.component'
import { QuoteAddComponent } from './quote-add/quote-add.component'
import { QuoteEditComponent } from './quote-edit/quote-edit.component'
import {
  QuoteResolverService,
  NewQuoteIDResolverService,
} from '../../core/resolvers/quote-resolver.service'
import { CompanyResolverService } from '../../core/resolvers/company-resolver.service'
import { ProductResolverService } from '../../core/resolvers/product-resolver.service'

const routes: Routes = [
  {
    path: '',
    component: QuoteListComponent,
    resolve: { quotes: QuoteResolverService },
  },
  {
    path: 'add',
    component: QuoteAddComponent,
    resolve: {
      company: CompanyResolverService,
      nextID: NewQuoteIDResolverService,
      products: ProductResolverService,
    },
  },
  {
    path: 'edit',
    component: QuoteEditComponent,
  },
  { path: '**', redirectTo: '/' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuoteRoutingModule {}
