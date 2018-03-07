import { NgModule } from '@angular/core'
import { DialogService } from './dialog/dialog.service'
import { ModuleWithProviders } from '@angular/compiler/src/core'

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [DialogService],
    }
  }
}
