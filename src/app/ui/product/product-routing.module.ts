import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProductListComponent } from './product-list/product-list.component'

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  { path: '**', redirectTo: '/' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
