import { CommonModule } from '@angular/common'
import { NgModule, ModuleWithProviders } from '@angular/core'
// import { ProductModule } from './product/product.module'
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { environment } from '../../environments/environment'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { LoginGuardService } from './guards/login-guard.service'

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
        {
          provide: LoginGuardService,
          useClass: LoginGuardService,
        },
      ],
    }
  }
}
