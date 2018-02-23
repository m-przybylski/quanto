import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ProductModule } from './product/product.module'
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { environment } from '../../environments/environment'
import { AngularFireAuthModule } from 'angularfire2/auth'

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ProductModule,
  ],
  declarations: [],
})
export class CoreModule {}
