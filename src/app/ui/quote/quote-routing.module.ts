import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { QuoteListComponent } from './quote-list/quote-list.component'
import { QuoteAddComponent } from './quote-add/quote-add.component'
import { QuoteEditComponent } from './quote-edit/quote-edit.component'

const routes: Routes = [
  {
    path: '',
    component: QuoteListComponent,
  },
  {
    path: 'add',
    component: QuoteAddComponent,
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
