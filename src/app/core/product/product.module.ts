import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductService } from './product.service'
import { ProductCategoryService } from './product-category.service'

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [ProductService, ProductCategoryService],
})
export class ProductModule {}
