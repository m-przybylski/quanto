import { CommonModule } from '@angular/common'
import { NgModule, ModuleWithProviders } from '@angular/core'
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { environment } from '../../environments/environment'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { LoginGuardService } from './guards/login-guard.service'
import { UserResolverService } from './resolvers/user-resolver.service'
import { ProductResolverService } from './resolvers/product-resolver.service'
import {
  QuoteResolverService,
  NewQuoteIDResolverService,
} from './resolvers/quote-resolver.service'
import { ProductService } from './product/product.service'
import { ProductCategoryResolverService } from './resolvers/product-category-resolver.service'
import { QuoteService } from './quote/quote.service'
import { CompanyResolverService } from './resolvers/company-resolver.service'
import { CompanyService } from './company/company.service'
import { ClientResolverService } from './resolvers/client-resolver.service'
import { PdfService } from './pdf/pdf.service'
import { ProductCurrencyResolverService } from './resolvers/product-currency-resolver.service'
import { UserService } from './user/user.service'

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  declarations: [],
  providers: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: LoginGuardService, useClass: LoginGuardService },
        UserResolverService,
        ProductCategoryResolverService,
        ProductCurrencyResolverService,
        ProductResolverService,
        ProductService,
        NewQuoteIDResolverService,
        ClientResolverService,
        QuoteResolverService,
        QuoteService,
        CompanyResolverService,
        CompanyService,
        PdfService,
        UserService,
      ],
    }
  }
}
