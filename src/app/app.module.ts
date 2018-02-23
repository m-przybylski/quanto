import { NgModule, ErrorHandler } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { UiModule } from './ui/ui.module'
import { GlobalErrorHandler } from './core/error-handler'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, UiModule],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
