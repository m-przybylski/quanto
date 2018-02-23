import { NgModule, ErrorHandler } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { UiModule } from './ui/ui.module'
import { GlobalErrorHandler } from './core/error-handler'
import { CoreModule } from './core/core.module'
import { ProgressBarModule } from 'primeng/progressbar'

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    UiModule,
    ProgressBarModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
