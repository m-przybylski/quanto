import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { ProductRoutingModule } from './product-routing.module'
import { ProductListComponent } from './product-list/product-list.component'
import { ListModule } from '../../shared/list/list.module'
import { CoreModule } from '../../core/core.module'
import { ProductAddComponent } from './product-add/product-add.component'
import { ProductEditComponent } from './product-edit/product-edit.component'
import { DataListModule } from 'primeng/datalist'
import { ButtonModule } from 'primeng/button'

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    ListModule,
    CoreModule,
    ReactiveFormsModule,
    DataListModule,
    ButtonModule,
  ],
  declarations: [
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
  ],
})
export class ProductModule {}
