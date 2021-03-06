import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { QuoteRoutingModule } from './quote-routing.module'
import { QuoteListComponent } from './quote-list/quote-list.component'
import { ButtonModule } from 'primeng/button'
import { HeaderModule } from '../../shared/header/header.module'
import { DataListModule } from 'primeng/datalist'
import { QuoteService } from '../../core/quote/quote.service'
import { CoreModule } from '../../core/core.module'
import { QuoteAddComponent } from './quote-add/quote-add.component'
import { ReactiveFormsModule } from '@angular/forms'
import { CompanyService } from '../../core/company/company.service'
import { ProductService } from '../../core/product/product.service'
import { DropdownModule } from 'primeng/dropdown'
import { InputTextModule } from 'primeng/inputtext'
import { QuoteEditComponent } from './quote-edit/quote-edit.component'
import { CalendarModule } from 'primeng/calendar'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { QuoteFormComponent } from './quote-form/quote-form.component'
import { QuotePreviewComponent } from './quote-preview/quote-preview.component'
import { OverlayModule } from '@angular/cdk/overlay'
import { DialogService } from '../../shared/dialog/dialog.service'

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    QuoteRoutingModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    HeaderModule,
    DataListModule,
    CalendarModule,
    AutoCompleteModule,
    OverlayModule,
  ],
  providers: [QuoteService, CompanyService, ProductService, DialogService],
  declarations: [
    QuoteListComponent,
    QuoteAddComponent,
    QuoteEditComponent,
    QuoteFormComponent,
    QuotePreviewComponent,
  ],
  entryComponents: [QuotePreviewComponent],
})
export class QuoteModule {}
