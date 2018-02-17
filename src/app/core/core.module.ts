import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ProductModule } from './product/product.module'
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { environment } from '../../environments/environment'

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ProductModule,
  ],
  declarations: [],
})
export class CoreModule {}
