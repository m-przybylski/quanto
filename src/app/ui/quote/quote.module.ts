import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { QuoteRoutingModule } from './quote-routing.module'
import { QuoteListComponent } from './quote-list/quote-list.component'

@NgModule({
  imports: [CommonModule, QuoteRoutingModule],
  declarations: [QuoteListComponent],
})
export class QuoteModule {}
