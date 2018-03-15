import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { ProductRoutingModule } from './product-routing.module'
import { ProductListComponent } from './product-list/product-list.component'
import { CoreModule } from '../../core/core.module'
import { ProductAddComponent } from './product-add/product-add.component'
import { ProductEditComponent } from './product-edit/product-edit.component'
import { DataListModule } from 'primeng/datalist'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { DropdownModule } from 'primeng/dropdown'
import { EditorModule } from 'primeng/editor'
import { HeaderModule } from '../../shared/header/header.module'
import { ProductFormComponent } from './product-form/product-form.component'
@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    DataListModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    EditorModule,
    HeaderModule,
  ],
  declarations: [
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductFormComponent,
  ],
})
export class ProductModule {}
