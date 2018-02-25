import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductAddComponent } from './product-add/product-add.component'
import { ProductResolverService } from '../../core/resolvers/product-resolver.service'
import { ProductCategoryResolverService } from '../../core/resolvers/product-category-resolver.service'

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    resolve: { products: ProductResolverService },
  },
  {
    path: 'add',
    component: ProductAddComponent,
    resolve: { productCategories: ProductCategoryResolverService },
  },
  { path: '**', redirectTo: '/' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
